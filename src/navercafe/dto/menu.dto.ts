export class MenuDto {
  readonly alarm: boolean;
  readonly commentAlarm: boolean;
  readonly subscription: boolean;
  readonly cafeId: number;
  readonly menuId: number;
  readonly menuName: string;
  readonly menuType: 'B' | 'M' | 'F' | 'S';
  readonly boardType: 'I' | 'L' | 'M' | ' ';
  readonly linkUrl: string;
  readonly listOrder: number;
  readonly fold: boolean;
  readonly indent: boolean;
  readonly lastUpdateDate: string;
  readonly searchRefDate: string;
  readonly badMenu: boolean;
  readonly favorite: boolean;
  readonly hasNewArticle: boolean;
  readonly hasRegion: boolean;
}
