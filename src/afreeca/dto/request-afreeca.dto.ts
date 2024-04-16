export class RequestAfreecaDto {
  readonly method?:
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'PATCH'
    | 'HEAD'
    | 'OPTIONS' = 'GET';
  readonly hostname?: string;
  readonly pathname: string;
  readonly params?: Record<string, string>;
}
