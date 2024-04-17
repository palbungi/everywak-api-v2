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
  readonly body?: Record<string, string | number | boolean>;

  constructor(partial: Partial<RequestAfreecaDto>) {
    Object.assign(this, partial);
  }
}
