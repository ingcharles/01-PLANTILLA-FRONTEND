import { Injectable } from '@angular/core';
import { ResponseStatus, ResponseStatusData, ResponseStatusError } from 'src/data/models/response-status.model';
import { PersonaRSViewModel } from 'src/domain/viewModels/persona.viewModel';

@Injectable({ providedIn: 'root' })
export class StatusResponseService  {
  constructor() { }

  error(httpErrorResponse: any): ResponseStatusError {
    let { error, ok } = httpErrorResponse;
    let responseStatus: ResponseStatusError = <ResponseStatusError>{}
    if (error.StatusCode == 404 || error.StatusCode == 500 ) {
      responseStatus = { message: error.Message, statusCode: error.StatusCode,  ok}
    }
    // if(error.status==400){
    //   responseStatus = { messages: JSON.stringify(error.errors),statusCode: error.status,ok}
    // }

    return responseStatus;

  }

  ok(httpResponse: any): ResponseStatusData {
   
    return { messages: httpResponse.Message, statusCode: httpResponse.StatusCode,ok:  httpResponse.Ok, data:httpResponse.Data};

  }

  
}