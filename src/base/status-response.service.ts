import { Injectable } from '@angular/core';
import { ResponseStatus } from 'src/data/models/response-status.model';

@Injectable({ providedIn: 'root' })
export class StatusResponseService  {
  constructor() { }

  error(httpErrorResponse: any): ResponseStatus {
    console.log("Error",httpErrorResponse);
    let { error, ok } = httpErrorResponse;
    let responseStatus: ResponseStatus = <ResponseStatus>{}
    if (error.StatusCode == 404 || error.StatusCode == 500 ) {
      responseStatus = { messages: error.Message, statusCode: error.StatusCode,  ok}
    }
    if(error.status==400){
      responseStatus = { messages: JSON.stringify(error.errors),statusCode: error.status,ok}
    }

    return responseStatus;

  }

  ok(httpResponse: any): ResponseStatus {
    console.log("ok");
   
    return { messages: httpResponse.Message, statusCode: httpResponse.StatusCode,ok:  httpResponse.Ok, data:httpResponse.Data};

  }
}