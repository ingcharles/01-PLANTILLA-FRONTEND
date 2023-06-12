export interface ResponseStatus{
  message: string ;
  statusCode: number | null;
  ok: boolean | null;
//  data?:any;
}

export interface ResponseStatusData{
  messages: string ;
  statusCode: number | null;
  ok: boolean | null;
 data?:any;
}
export interface ResponseStatusError{
  message: string ;
  statusCode: number | null;
  ok: boolean | null;

}