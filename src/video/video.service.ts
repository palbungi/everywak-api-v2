import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from 'src/member/entities/member.entity';
import { MemberService } from 'src/member/member.service';
import { SelectPlaylistDto } from 'src/youtube/dto/select-playlist.dto';
import { SelectVideoDto } from 'src/youtube/dto/select-video.dto';
import { YoutubeService } from 'src/youtube/youtube.service';
import { YoutubeVideo } from 'src/youtube/youtube.type';
import { FindOptionsOrder, ILike, Repository } from 'typeorm';
import { OrderBy, SearchVideoDto } from './dto/search-video.dto';
import { Video } from './entities/video.entity';

@Injectable()
export class VideoService {
  @InjectRepository(Video)
  private readonly videoRepository: Repository<Video>;
  @Inject(MemberService)
  private readonly memberService: MemberService;
  @Inject(YoutubeService)
  private readonly youtubeService: YoutubeService;

  async findVideos(searchVideoDto: SearchVideoDto) {
    const orderBy: Record<OrderBy, FindOptionsOrder<Video>> = {
      time: { publishedTimestamp: 'DESC' },
      time_oldest: { publishedTimestamp: 'ASC' },
      view: { viewCount: 'DESC' },
    };

    // TODO: startAt, endAt 구현
    // TODO: isShorts 구현

    return this.videoRepository.find({
      select: [
        'videoId',
        'publishedTimestamp',
        'title',
        'member',
        'channel',
        'thumbnails',
        'viewCount',
        'duration',
        'isShorts',
      ],
      where: {
        title: ILike(`%${searchVideoDto.keyword}%`),
      },
      order: orderBy[searchVideoDto.orderBy],
      take: searchVideoDto.perPage,
      skip: (searchVideoDto.page - 1) * searchVideoDto.perPage,
    });
  }

  async getYoutubeChannels(members: Member[]) {
    const youtubeChannels = members.flatMap((member) => {
      return member.youtubeChannel;
    });
    return youtubeChannels;
  }

  async getYoutubeVideos(members: Member[]) {
    const youtubeChannels = await this.getYoutubeChannels(members);

    const result: YoutubeVideo[] = [];
    for (const youtubeChannel of youtubeChannels) {
      const playlistItems = await this.youtubeService.getPlaylistItems(
        new SelectPlaylistDto({
          playlistId: youtubeChannel.uploads,
          selectAll: true,
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

  async updateVideos() {
    const members = await this.memberService.findAll();
    const youtubeVideos = await this.getYoutubeVideos(members);

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

    return videos.length;
  }
}
