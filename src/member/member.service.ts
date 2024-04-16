import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Waktaverse } from 'src/constants/waktaverse';
import { SelectChannelDto } from 'src/youtube/dto/select-channel.dto';
import { YoutubeService } from 'src/youtube/youtube.service';
import { Repository } from 'typeorm';
import { ulid } from 'ulidx';
import { CreateLivePlatformDto } from './dto/create-live-platform.dto';
import { CreateMemberDto } from './dto/create-member.dto';
import { CreateSocialDto } from './dto/create-social.dto';
import { CreateYoutubeChannelDto } from './dto/create-youtube-channel.dto';
import { UpdateOfflineImageDto } from './dto/update-offline-image.dto';
import { UpdateProfileImageDto } from './dto/update-profile-image.dto';
import { LivePlatform } from './entities/livePlatform.entity';
import { Member } from './entities/member.entity';
import { Profile } from './entities/profile.entity';
import { Social } from './entities/social.entity';
import { YoutubeChannel } from './entities/youtubeChannel.entity';

@Injectable()
export class MemberService {
  @InjectRepository(Member)
  private readonly memberRepository: Repository<Member>;
  @Inject(YoutubeService)
  private readonly youtubeService: YoutubeService;

  /**
   * @description 멤버 전체 조회
   */
  findAll() {
    return this.memberRepository.find({
      relations: ['profile', 'livePlatform', 'youtubeChannel', 'social'],
    });
  }

  /**
   * @description 멤버 ID로 조회
   */
  async findMemberById(id: string) {
    const [member] = await this.memberRepository.find({
      where: { id },
      relations: ['profile', 'livePlatform', 'youtubeChannel', 'social'],
    });

    if (!member) {
      throw new NotFoundException(`Member with id ${id} not found`);
    }

    return member;
  }

  /**
   * @description 멤버 생성
   */
  createMember(createMemberDto: CreateMemberDto) {
    const memberAndProfiles = createMemberDto.members.map((dto) => {
      const member = new Member();
      member.id = ulid();
      member.name = dto.name;
      member.role = dto.role;

      const profile = new Profile();
      profile.id = ulid();

      member.profile = profile;
      return { member, profile };
    });

    this.memberRepository.manager.transaction(
      async (transactionalEntityManager) => {
        for (const { member, profile } of memberAndProfiles) {
          await transactionalEntityManager.save(member);
          await transactionalEntityManager.save(profile);
        }
      },
    );

    return memberAndProfiles.map(({ member }) => member);
  }

  /**
   * @description 멤버 전체 삭제
   */
  dropMemberAll() {
    return this.memberRepository.manager.transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager.delete(LivePlatform, {});
        await transactionalEntityManager.delete(YoutubeChannel, {});
        await transactionalEntityManager.delete(Social, {});
        await transactionalEntityManager.delete(Member, {});
        await transactionalEntityManager.delete(Profile, {});
      },
    );
  }

  /**
   * @description 프로필 이미지 업데이트
   */
  async updateProfileImage(updateProfileImageDto: UpdateProfileImageDto) {
    const member = await this.findMemberById(updateProfileImageDto.memberId);

    member.profile.profileImage = updateProfileImageDto.profileImage;

    return this.memberRepository.save(member);
  }

  /**
   * @description 생방송 오프라인 이미지 업데이트
   */
  async updateOfflineImage(updateOfflineImageDto: UpdateOfflineImageDto) {
    const member = await this.findMemberById(updateOfflineImageDto.memberId);

    member.profile.offlineImage = updateOfflineImageDto.offlineImage;

    return this.memberRepository.save(member);
  }

  /**
   * @description 생방송 플랫폼 생성
   */
  async createLivePlatform(createLivePlatformDto: CreateLivePlatformDto) {
    const member = await this.findMemberById(createLivePlatformDto.memberId);

    const livePlatform = new LivePlatform();
    livePlatform.id = member.id;
    livePlatform.type = createLivePlatformDto.type;
    livePlatform.name = createLivePlatformDto.name;
    livePlatform.channelId = createLivePlatformDto.channelId;
    livePlatform.member = member;

    this.memberRepository.manager.transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager.save(member);
        await transactionalEntityManager.save(livePlatform);
      },
    );

    return member;
  }

  /**
   * @description 소셜 생성
   */
  async createSocial(createSocialDto: CreateSocialDto) {
    const member = await this.findMemberById(createSocialDto.memberId);

    const social = new Social();
    social.id = member.id;
    social.type = createSocialDto.type;
    social.name = createSocialDto.name;
    social.userId = createSocialDto.userId;
    social.member = member;

    this.memberRepository.manager.transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager.save(member);
        await transactionalEntityManager.save(social);
      },
    );

    return member;
  }

  /**
   * @description 유튜브 채널 생성
   */
  async createYoutubeChannel(createYoutubeChannelDto: CreateYoutubeChannelDto) {
    const member = await this.findMemberById(createYoutubeChannelDto.memberId);

    const youtubeChannel = new YoutubeChannel();
    youtubeChannel.id = member.id;
    youtubeChannel.type = createYoutubeChannelDto.type;
    youtubeChannel.name = createYoutubeChannelDto.name;
    youtubeChannel.channelId = createYoutubeChannelDto.channelId;
    youtubeChannel.uploads = createYoutubeChannelDto.uploads;
    youtubeChannel.member = member;

    this.memberRepository.manager.transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager.save(member);
        await transactionalEntityManager.save(youtubeChannel);
      },
    );

    return member;
  }

  /**
   * @description 왁타버스 멤버 정보 삽입
   */
  async insertWaktaverseMembers() {
    // 왁타버스 멤버 정보 가져오기
    const members = Waktaverse.map((member) => {
      const memberEntity = new Member();
      memberEntity.id = member.id;
      memberEntity.name = member.name;
      memberEntity.role = member.role;

      const profile = new Profile();
      profile.id = ulid();

      memberEntity.profile = profile;

      memberEntity.livePlatform = member.lives.map((platform) => {
        const livePlatformEntity = new LivePlatform();
        livePlatformEntity.id = member.id;
        livePlatformEntity.type = platform.type;
        livePlatformEntity.name = platform.name;
        livePlatformEntity.channelId = platform.id;
        livePlatformEntity.member = memberEntity;

        return livePlatformEntity;
      });

      memberEntity.youtubeChannel = member.youtube?.map((channel) => {
        const youtubeChannelEntity = new YoutubeChannel();
        youtubeChannelEntity.id = member.id;
        youtubeChannelEntity.type = channel.type;
        youtubeChannelEntity.name = channel.name;
        youtubeChannelEntity.channelId = channel.id;
        youtubeChannelEntity.uploads = channel.uploads;
        youtubeChannelEntity.member = memberEntity;

        return youtubeChannelEntity;
      });

      memberEntity.social = member.socials?.map((social) => {
        const socialEntity = new Social();
        socialEntity.id = member.id;
        socialEntity.type = social.type;
        socialEntity.name = social.name;
        socialEntity.userId = social.id ?? social.name;
        socialEntity.member = memberEntity;

        return socialEntity;
      });

      return memberEntity;
    });

    await this.memberRepository.manager.transaction(
      async (transactionalEntityManager) => {
        // 기존 데이터 삭제
        await this.dropMemberAll();

        // 멤버 정보 저장
        for (const member of members) {
          await transactionalEntityManager.save(member);
          await transactionalEntityManager.save(member.profile);
          if (member.livePlatform) {
            for (const livePlatform of member.livePlatform) {
              await transactionalEntityManager.save(livePlatform);
            }
          }
          if (member.youtubeChannel) {
            for (const youtubeChannel of member.youtubeChannel) {
              await transactionalEntityManager.save(youtubeChannel);
            }
          }
          if (member.social) {
            for (const social of member.social) {
              await transactionalEntityManager.save(social);
            }
          }
        }
      },
    );

    await this.updateAllMemberProfileImage();

    return await this.findAll();
  }

  /**
   * @description 모든 멤버 프로필 이미지 갱신하기
   */
  async updateAllMemberProfileImage() {
    const members = await this.findAll();

    const youtubeChannel = members
      .map((member) => {
        const mainChannel = member.youtubeChannel?.find(
          (channel) => channel.type === 'main',
        );
        if (!mainChannel) {
          return null;
        }
        return {
          memberId: member.id,
          channelId: mainChannel.channelId,
        };
      })
      .filter((channel) => channel);

    const channels = await this.youtubeService.getChannels(
      new SelectChannelDto(youtubeChannel.map((channel) => channel.channelId)),
    );

    this.memberRepository.manager.transaction(
      async (transactionalEntityManager) => {
        for (const member of members) {
          const channel =
            channels.items[
              youtubeChannel.findIndex((c) => c.memberId === member.id)
            ];
          if (channel) {
            // 유튜브 채널이 존재할 경우
            member.profile.profileImage =
              channel.snippet.thumbnails.default.url;
          } else if (
            member.livePlatform.find((platform) => platform.type === 'afreeca')
          ) {
            // 아프리카TV 채널이 존재할 경우
            const afreecaChannel = member.livePlatform.find(
              (platform) => platform.type === 'afreeca',
            );
            member.profile.profileImage = `https://profile.img.afreecatv.com/LOGO/${afreecaChannel.name.slice(0, 2)}/${afreecaChannel.name}/${afreecaChannel.name}.jpg`;
          } else {
            // 프로필 이미지가 없을 경우
            continue;
          }
          await transactionalEntityManager.save(member);
        }
      },
    );

    return members;
  }
}
