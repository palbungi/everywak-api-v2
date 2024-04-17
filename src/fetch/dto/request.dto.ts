export class RequestDto {
  readonly method?:
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'PATCH'
    | 'HEAD'
    | 'OPTIONS' = 'GET';
  readonly hostname: string;
  readonly pathname: string;
  readonly params?: Record<string, string>;
  readonly body?: Record<string, string | number | boolean>;
  readonly headers?: Record<string, string> = {};

  constructor(partial: Partial<RequestDto>) {
    Object.assign(this, partial);
  }
}
