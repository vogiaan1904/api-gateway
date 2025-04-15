export interface ResponseError {
  code: number;
  message: string;
}

export interface HttpResponse {
  code: number;
  message: string;
  data: any;
  errors: ResponseError[] | null;
}
