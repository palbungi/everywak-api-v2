export type YoutubeChannel = {
  kind: 'youtube#channel';
  etag: string;
  id: string;
  snippet: {
    title: string;
    description: string;
    customUrl: string;
    publishedAt: number;
    thumbnails: {
      [key: string]: { url: string; width: number; height: number };
    };
    defaultLanguage: string;
    localized: { title: string; description: string };
    country: string;
  };
  contentDetails: {
    relatedPlaylists: {
      likes: string;
      uploads: string;
    };
  };
  statistics: {
    viewCount: number;
    subscriberCount: number;
    hiddenSubscriberCount: number;
    videoCount: number;
  };
  brandingSettings: {
    channel: {
      title: string;
      description: string;
      keywords: string;
      unscribedTrailer: string;
      defaultLanguage: string;
      country: string;
    };
    image: {
      bannerExternalUrl: string;
    };
  };
};
export type ChannelListResponse = {
  kind: 'youtube#channelListResponse';
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  pageInfo: { totalResults: number; resultsPerPage: number };
  items: YoutubeChannel[];
};

export type YoutubePlaylistItem = {
  kind: 'youtube#playlistItem';
  etag: string;
  id: string;
  snippet: {
    publishedAt: number;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      [key: string]: { url: string; width: number; height: number };
    };
    channelTitle: string;
    playlistId: string;
    position: number;
    resourceId: {
      kind: 'youtube#video';
      videoId: string;
    };
  };
  contentDetails: {
    videoId: string;
    startAt: string;
    endAt: string;
    note: string;
  };
  status: {
    privacyStatus: string;
  };
};
export type PlaylistItemListResponse = {
  kind: 'youtube#playlistItemListResponse';
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  pageInfo: { totalResults: number; resultsPerPage: number };
  items: YoutubePlaylistItem[];
};

export type YoutubeStream = {
  channelId: string;
  isLive: boolean;
  videoId: string | null;
};