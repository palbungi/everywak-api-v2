import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from 'src/member/entities/member.entity';
import { MemberService } from 'src/member/member.service';
import { generateDateHourString } from 'src/util/functions';
import { SelectPlaylistDto } from 'src/youtube/dto/select-playlist.dto';
import { SelectVideoDto } from 'src/youtube/dto/select-video.dto';
import { YoutubeService } from 'src/youtube/youtube.service';
import { YoutubeVideo } from 'src/youtube/youtube.type';
import {
  FindOptionsOrder,
  FindOptionsWhere,
  ILike,
  LessThan,
  Repository,
} from 'typeorm';
import { OrderBy, SearchVideoDto } from './dto/search-video.dto';
import { VideoViewCount } from './entities/video-view-count.entity';
import { Video } from './entities/video.entity';

@Injectable()
export class VideoService {
  @InjectRepository(Video)
  private readonly videoRepository: Repository<Video>;
  @InjectRepository(VideoViewCount)
  private readonly videoViewCountRepository: Repository<VideoViewCount>;
  @Inject(MemberService)
  private readonly memberService: MemberService;
  @Inject(YoutubeService)
  private readonly youtubeService: YoutubeService;

  async find(searchVideoDto: SearchVideoDto) {
    const orderBy: Record<OrderBy, FindOptionsOrder<Video>> = {
      time: { publishedTimestamp: 'DESC' },
      time_oldest: { publishedTimestamp: 'ASC' },
      view: { viewCount: 'DESC' },
    };

    const where: FindOptionsWhere<Video> = {
      title: ILike(`%${searchVideoDto.keyword}%`),
      ...(searchVideoDto.memberId
        ? { 'member.id': searchVideoDto.memberId }
        : {}),
      ...(searchVideoDto.channelType
        ? { 'channel.type': searchVideoDto.channelType }
        : {}),
      isShorts: searchVideoDto.isShorts,
    };

    // TODO: startAt, endAt 구현

    return this.videoRepository.find({
      select: [
        'videoId',
        'publishedTimestamp',
        'title',
        'thumbnails',
        'viewCount',
        'duration',
        'isShorts',
      ],
      where,
      order: orderBy[searchVideoDto.orderBy],
      take: searchVideoDto.perPage,
      skip: (searchVideoDto.page - 1) * searchVideoDto.perPage,
      relations: ['member', 'channel'],
    });
  }

  findAllViewCount() {
    return this.videoViewCountRepository.find();
  }

  findViewCount({ endAt }: { endAt: number }) {
    return this.videoViewCountRepository.find({
      where: {
        time: LessThan(endAt),
      },
    });
  }

  async getYoutubeChannels(members: Member[]) {
    const youtubeChannels = members.flatMap((member) => {
      return member.youtubeChannel;
    });
    return youtubeChannels;
  }

  async getYoutubeVideos(members: Member[], selectAll: boolean = true) {
    const youtubeChannels = await this.getYoutubeChannels(members);

    const result: YoutubeVideo[] = [];
    for (const youtubeChannel of youtubeChannels) {
      const playlistItems = await this.youtubeService.getPlaylistItems(
        new SelectPlaylistDto({
          playlistId: youtubeChannel.uploads,
          selectAll,
        }),
      );
      console.log(
        youtubeChannel.name,
        youtubeChannel.channelId,
        playlistItems.length,
      );
      const videoIds = playlistItems.map(
        (item) => item.snippet.resourceId.videoId,
      );
      const videos = await this.youtubeService.getVideos(
        new SelectVideoDto({ videoIds }),
      );

      result.push(...videos);
    }
    return result;
  }

  async saveViewCount() {
    const videos = await this.videoRepository.find();

    const now = new Date();
    const dateHourString = generateDateHourString(now);
    const videoViewCounts = videos.map((video) => {
      return new VideoViewCount({
        id: `${dateHourString}:${video.videoId}`,
        video,
        time: parseInt(dateHourString),
        viewCount: video.viewCount,
      });
    });

    await this.videoViewCountRepository.manager.transaction(async (manager) => {
      while (videoViewCounts.length > 0) {
        const videoViewCountsChunk = videoViewCounts.splice(0, 1000);
        await manager.upsert(VideoViewCount, videoViewCountsChunk, ['id']);
      }
    });

    return 200;
  }

  async updateVideos(fastUpdate: boolean = false) {
    const members = await this.memberService.findAll();
    const youtubeVideos = await this.getYoutubeVideos(members, !fastUpdate);

    const videos = youtubeVideos.map((video) => {
      const member = members.find((member) =>
        member.youtubeChannel.find(
          (youtubeChannel) =>
            youtubeChannel.channelId === video.snippet.channelId,
        ),
      );
      const channel = member.youtubeChannel.find(
        (youtubeChannel) =>
          youtubeChannel.channelId === video.snippet.channelId,
      );
      return new Video({
        publishedTimestamp: new Date(video.snippet.publishedAt),
        videoId: video.id,
        title: video.snippet.title,
        member,
        channel,
        description: video.snippet.description,
        thumbnails: video.snippet.thumbnails.default.url,
        viewCount: video.statistics.viewCount,
        isShorts:
          video.snippet.title.includes('Shorts') ||
          video.snippet.title.includes('shorts'),
        duration: this.youtubeService.convertYTDurationToInteger(
          video.contentDetails.duration,
        ),
      });
    });

    await this.videoRepository.manager.transaction(async (manager) => {
      const videosCopy = [...videos];
      while (videosCopy.length > 0) {
        const videosChunk = videosCopy.splice(0, 1000);
        await manager.upsert(Video, videosChunk, ['videoId']);
      }
    });
    await this.saveViewCount();

    return videos.length;
  }
}
