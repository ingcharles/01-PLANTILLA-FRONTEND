export interface ResponseStatus{
  messages: string ;
  statusCode: number | null;
  ok: boolean | null;
  data?:any | null
}