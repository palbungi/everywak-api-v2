export type NaverCafeError = {
  result: {
    errorCode: string;
    reason: string;
    message: string;
    more: {
      cafeUrl: string;
      cafeName: string;
      pcCafeName: string;
      cafeId: number;
    };
  };
};