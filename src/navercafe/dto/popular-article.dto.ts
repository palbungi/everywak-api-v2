import { IsOptional } from 'class-validator';

export class PopularArticleDto {
  readonly statDate: string;
  readonly cafeId: number;
  readonly articleId: number;
  readonly subject: string;
  readonly nickname: string;
  readonly memberKey: string;
  readonly memberLevel: number;
  readonly memberLevelIconId: number;
  readonly commentCount: number;
  readonly formattedCommentCount: string;
  @IsOptional()
  readonly representImage: string = '';
  @IsOptional()
  readonly representImageWithoutType: string = '';
  @IsOptional()
  readonly representImageType: string = '';
  readonly imageCount: number;
  readonly writeDateTimestamp: number;
  readonly aheadOfWriteDate: string;
  readonly saleStatus: string;
  readonly noticeType: string;
  readonly menuId: number;
  readonly menuType: string;
  readonly boardType: string;
  readonly newArticle: boolean;
  readonly openArticle: boolean;
  readonly readCount: number;
  readonly upCount: number;
  readonly formattedReadCount: string;
  readonly hasNewComment: boolean;
  readonly lastCommentDateTimestamp: number;
  readonly refArticleId: number;
  readonly totalScore: number;
  readonly enableToReadWhenNotCafeMember: boolean;
}
