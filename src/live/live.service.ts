import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AfreecaService } from 'src/afreeca/afreeca.service';
import { Member } from 'src/member/entities/member.entity';
import { MemberService } from 'src/member/member.service';
import { Repository } from 'typeorm';
import { LiveChange } from './entities/live-change.entity';
import { Live } from './entities/live.entity';

@Injectable()
export class LiveService {
  @InjectRepository(Live)
  private readonly liveRepository: Repository<Live>;
  @InjectRepository(LiveChange)
  private readonly liveChangeRepository: Repository<LiveChange>;
  @Inject(MemberService)
  private readonly memberService: MemberService;
  @Inject(AfreecaService)
  private readonly afreecaService: AfreecaService;
  private readonly logger = new Logger(LiveService.name);

  findLiveAll(): Promise<Live[]> {
    this.logger.log('모든 생방송 목록 조회');
    return this.liveRepository.find({
      relations: ['livePlatform'],
    });
  }

  findLiveChangeAll(): Promise<LiveChange[]> {
    this.logger.log('모든 생방송 변동사항 목록 조회');
    return this.liveChangeRepository.find({
      relations: ['livePlatform'],
    });
  }

  async findLiveByMemberId(memberId: string) {
    this.logger.log(`생방송 조회: ${memberId}`);
    const member = await this.memberService.findMemberById(memberId);

    return this.liveRepository.find({
      where: { livePlatform: member.livePlatform },
      relations: ['livePlatform'],
    });
  }

  async getAllMemberAfreecaStream(members: Member[]): Promise<Live[]> {
    const afreecaChannels = members.flatMap((member) =>
      member.livePlatform.filter(
        (livePlatform) => livePlatform.type === 'afreeca',
      ),
    );
    const lives: Live[] = [];

    for (const afreecaChannel of afreecaChannels) {
      try {
        const station = await this.afreecaService.getStation(
          afreecaChannel.channelId,
        );

        if (!station.broad) {
          continue;
        }

        const stream = await this.afreecaService.getStream({
          channelId: afreecaChannel.channelId,
        });

        if (stream.CHANNEL.RESULT !== 1) {
          continue;
        }

        const newLive = new Live();
        newLive.id = `${afreecaChannel.id}:${afreecaChannel.type}`;
        newLive.livePlatform = afreecaChannel;
        newLive.isLive = true;
        newLive.title = stream.CHANNEL.TITLE;
        newLive.videoId = stream.CHANNEL.BNO;
        newLive.chatId = `wss://${stream.CHANNEL.CHDOMAIN.toLowerCase()}:${parseInt(stream.CHANNEL.CHPT) + 1}/Websocket/${stream.CHANNEL.BJID}`;
        newLive.thumbnail = `https://liveimg.sooplive.co.kr/h/${stream.CHANNEL.BNO}.webp`;
        newLive.viewerCount = station.broad.current_sum_viewer;
        newLive.startedTimestamp = new Date(
          (Math.floor(Date.now() / 1000) - stream.CHANNEL.BTIME) * 1000,
        );
        newLive.endedTimestamp = null;

        lives.push(newLive);
      } catch (error) {
        this.logger.warn(
          `아프리카 생방송 정보 조회 중 오류: ${afreecaChannel.channelId} ${JSON.stringify(error)}`,
        );

        console.error(error);
        throw error;
      }
    }
    this.logger.log(
      `아프리카 생방송 정보: ${lives.length}/${afreecaChannels.length}명`,
    );
    return lives;
  }

  async upsertLives(livesList: Live[][]) {
    return await this.liveRepository.manager.transaction(async (manager) => {
      for (const lives of livesList) {
        await manager.upsert(Live, lives, ['id']);
      }
    });
  }

  compareLives(oldLives: Live[], newLives: Live[]): LiveChange[] {
    const liveChanges: LiveChange[] = [];
    // 생방송 시작
    const startedLives = newLives.filter((live) =>
      oldLives.find(
        (oldLive) => oldLive.id === live.id && live.isLive && !oldLive.isLive,
      ),
    );
    // 생방송 종료
    const endedLives = newLives.filter((live) =>
      oldLives.find(
        (oldLive) => oldLive.id === live.id && !live.isLive && oldLive.isLive,
      ),
    );
    // 방송 리방
    const videoIdChangedLives = newLives.filter((live) =>
      oldLives.find(
        (oldLive) =>
          oldLive.id === live.id &&
          live.isLive &&
          oldLive.isLive &&
          oldLive.videoId !== live.videoId,
      ),
    );
    // 방제 변경
    const titleChangedLives = newLives.filter((live) =>
      oldLives.find(
        (oldLive) =>
          oldLive.id === live.id &&
          oldLive.title &&
          oldLive.title !== live.title,
      ),
    );

    // 생방송 시작
    liveChanges.push(
      ...startedLives.map(({ id, ...live }) => {
        const oldLive = oldLives.find((oldLive) => oldLive.id === id);
        return new LiveChange({
          ...live,
          status: 'BANGON',
          titlePrev: oldLive?.title,
        });
      }),
    );
    // 생방송 종료
    liveChanges.push(
      ...endedLives.map(({ id, ...live }) => {
        const oldLive = oldLives.find((oldLive) => oldLive.id === id);
        return new LiveChange({
          ...live,
          status: 'BANGOFF',
          titlePrev: oldLive.title,
        });
      }),
    );
    // 방송 리방
    liveChanges.push(
      ...videoIdChangedLives.map(({ id, ...live }) => {
        const oldLive = oldLives.find((oldLive) => oldLive.id === id);
        return new LiveChange({
          ...live,
          status: 'REBANG',
          titlePrev: oldLive.title,
        });
      }),
    );
    // 방제 변경
    liveChanges.push(
      ...titleChangedLives.map(({ id, ...live }) => {
        const oldLive = oldLives.find((oldLive) => oldLive.id === id);
        return new LiveChange({
          ...live,
          status: 'TITLE_CHANGE',
          titlePrev: oldLive.title,
        });
      }),
    );

    return liveChanges;
  }

  async updateWaktaverseLive() {
    this.logger.log('왁타버스 생방송 목록 갱신 시작');
    const members = await this.memberService.findAll();

    if (members.length === 0) {
      return [];
    }

    const oldLives = await this.findLiveAll();
    const oldLivesFixed = oldLives.map((live) => ({
      ...live,
    }));
    oldLives.forEach((live) => {
      live.isLive = false;
      live.endedTimestamp = live.endedTimestamp ?? new Date();
    });

    const currentLives: Live[] = [];
    currentLives.push(...(await this.getAllMemberAfreecaStream(members)));
    // TODO: 유튜브 생방송 추가

    await this.upsertLives([oldLives, currentLives]);

    const newLives = await this.findLiveAll();

    const liveChanges = this.compareLives(oldLivesFixed, newLives);
    await this.liveChangeRepository.upsert(liveChanges, ['id']);

    this.logger.log('왁타버스 생방송 정보 갱신 완료');
    return newLives;
  }
}
