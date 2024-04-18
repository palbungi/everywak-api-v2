export class ArticleListDto {
  cafeId: number;
  cafeName: string;
  cafeStaff: boolean;
  cafeMember: boolean;
  blockMemberList: any[];
  hasNext: boolean;
  articleList: ArticleListItem[];
  manageMenus: ManageMenus;
  menuInfo: MenuInfo;
  advertMessageList: any[];
  recentBoardNoticeList: RecentBoardNoticeListItem[];
  exposePlugReservation: boolean;
  homeDaAdvertVisible: boolean;
  adFreeGameCafe: boolean;
}

export type ArticleListItem = {
  cafeId: number;
  articleId: number;
  refArticleId: number;
  replyListOrder: string;
  menuId: number;
  menuName: string;
  menuType: string;
  restrictMenu: boolean;
  boardType: string;
  subject: string;
  memberKey: string;
  writerNickname: string;
  memberLevel: number;
  memberLevelIconId: number;
  memberLiked: boolean;
  profileImage: string;
  newArticle: boolean;
  replyArticle: boolean;
  blindArticle: boolean;
  openArticle: boolean;
  marketArticle: boolean;
  useSafetyPayment: boolean;
  escrow: boolean;
  onSale: boolean;
  cost: number;
  formattedCost: string;
  productSale: {
    saleStatus: string;
    cost: string;
  };
  attachImage: boolean;
  attachMusic: boolean;
  attachMovie: boolean;
  attachFile: boolean;
  attachMap: boolean;
  attachGpx: boolean;
  attachPoll: boolean;
  attachLink: boolean;
  attachCalendar: boolean;
  popular: boolean;
  useHead: boolean;
  headId: number;
  headName: string;
  enableComment: boolean;
  hasNewComment: boolean;
  refArticleCount: number;
  readCount: number;
  commentCount: number;
  likeItCount: number;
  writeDateTimestamp: number;
  delParent: boolean;
  blogScrap: boolean;
  enableRecommendation: boolean;
};

export type ManageMenus = {
  showArticleDelete: boolean;
  showReportBadArticle: boolean;
  showBoardNotice: boolean;
  showOneBoardNotice: boolean;
  showActivityStop: boolean;
  showSecede: boolean;
  showArticleMove: boolean;
  showLevelUp: boolean;
  showRequiredNotice: boolean;
  showPopularArticleHide: boolean;
};

export type MenuInfo = {
  menuId: number;
  menuName: string;
  menuType: string;
  boardType: string;
};

export type RecentBoardNoticeListItem = {
  articleId: number;
  subject: string;
  newNotice: boolean;
};
