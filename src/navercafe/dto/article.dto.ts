export class ArticleDto {
  cafeId: number;
  articleId: number;
  heads: {
    headId: number;
    head: string;
  }[];
  article: {
    id: number;
    refArticleId: number;
    menu: {
      id: number;
      name: string;
      menuType: string;
      boardType: string;
      badMenu: boolean;
      badMenuByRestrict: boolean;
    };
    subject: string;
    writer: {
      id: string;
      memberKey: string;
      baMemberKey: string;
      nick: string;
      image: {
        url: string;
        service: string;
        type: string;
      };
      memberLevel: number;
      memberLevelName: string;
      memberLevelIconUrl: string;
      currentPopularMember: boolean;
    };
    subscribeWriter: {
      subscribe: boolean;
      push: boolean;
    };
    writeDate: number;
    readCount: number;
    commentCount: number;
    decorator: {
      isShowSuicideSaver: boolean;
      isPlug: boolean;
    };
    existScrapAddContent: boolean;
    template: {
      isUse: boolean;
    };
    contentHtml: string;
    contentElements: any[];
    gdid: string;
    replyListOrder: string;
    isNotice: boolean;
    isNewComment: boolean;
    isDeleteParent: boolean;
    isMarket: boolean;
    isGroupPurchase: boolean;
    isPersonalTrade: boolean;
    isReadable: boolean;
    isBlind: boolean;
    isOpen: boolean;
    isEnableScrap: boolean;
    scrapCount: number;
    isEnableExternal: boolean;
    isEnableSocialPlugin: boolean;
    isWriteComment: boolean;
    isAutoSourcing: boolean;
  };
  comments: {
    items: CommentItem[];
  };
  advert: {
    type: string;
    daAdvertUnitId: string;
    daAdvertDivId: string;
  };
  cafe: {
    id: number;
    name: string;
    pcCafeName: string;
    url: string;
    image: {
      url: string;
      service: string;
      type: string;
    };
    introduction: string;
    memberCount: number;
    hasPopularArticle: boolean;
    usingMemberLevel: boolean;
    memberLevelIconId: number;
    openType: string;
    isDormant: boolean;
  };
  user: {
    id: string;
    memberKey: string;
    baMemberKey: string;
    nick: string;
    image: {
      url: string;
      service: string;
      type: string;
      isAnimated: boolean;
    };
    memberLevel: number;
    blockMemberList: string[];
    memberLevelName: string;
    memberLevelIconUrl: string;
    personacon: number;
    currentPopularMember: boolean;
    appliedAlready: boolean;
    permission: {
      isBoardStaff: boolean;
      isOnlyOptionalBoardStaff: boolean;
      isActivityStopExecutable: boolean;
      isNoticeRegistrable: boolean;
      isViceManager: boolean;
      isCafeManager: boolean;
      isEntireBoardStaff: boolean;
      isMemberStaff: boolean;
    };
    isCafeMember: boolean;
    isLogin: boolean;
    isOwner: boolean;
    isGroupId: boolean;
    isBelowAge14: boolean;
  };
  attaches: any[];
  tags: any[];
  authority: {
    isRightClick: boolean;
    isShowReply: boolean;
    isWriteReply: boolean;
    isStore: boolean;
    isWrite: boolean;
    isModify: boolean;
    isRemove: boolean;
    isMove: boolean;
    isReport: boolean;
    isShowLike: boolean;
    isDoLike: boolean;
    isShowStatistics: boolean;
    isWriteComment: boolean;
    isSharable: boolean;
    isHeadModifiable: boolean;
    isEnableAttachFileDownload: boolean;
  };
  editorVersion: string;
  readOnlyModeInfo: {
    readOnlyModeStatus: boolean;
    timeToPreNotice: boolean;
    timeToNotice: boolean;
    emergency: boolean;
    readOnlyNoticeDuration: string;
    linkToNoticeURL: string;
  };
  articleRegion: {
    rcode: string;
    type: string;
    name: string;
    regionCode1: string;
    regionName1: string;
    regionCode2: string;
    regionName2: string;
    regionCode3: string;
    regionName3: string;
  };
  standardReportPopup: {
    normalUrl: string;
    darkUrl: string;
    showRemoveAlert: boolean;
  };
  isReadOnlyMode: boolean;
  isW800: boolean;
}

export type CommentItem = {
  id: number;
  refId: number;
  writer: {
    id: string;
    memberKey: string;
    nick: string;
    image: {
      url: string;
      service: string;
      type: string;
    };
    currentPopularMember: boolean;
  };
  content: string;
  updateDate: number;
  memberLevel: number;
  memberLevelIconId: number;
  cleanBotDetected: boolean;
  isRef: boolean;
  isDeleted: boolean;
  isArticleWriter: boolean;
  isNew: boolean;
  isRemovable: boolean;
  standardReportPopup: {
    normalUrl: string;
    darkUrl: string;
    showRemoveAlert: boolean;
  };
  sticker?: {
    id: string;
    url: string;
    type: string;
    animation: boolean;
    width: number;
    height: number;
  };
}