export type ReadonlyRecord<P extends string = string, Q = P> = Readonly<
  Record<P, Q>
>;

export type LiveChangeType = 'BANGON' | 'BANGOFF' | 'TITLE_CHANGE' | 'REBANG';

export const LiveChangeEnum: ReadonlyRecord<LiveChangeType> = {
  BANGON: 'BANGON',
  BANGOFF: 'BANGOFF',
  TITLE_CHANGE: 'TITLE_CHANGE',
  REBANG: 'REBANG',
};
