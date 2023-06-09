import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environments } from 'src/environments/environments';
import { PersonaModel } from 'src/data/models/persona.model';
import { CatalogoModel } from 'src/data/models/catalogo.model';
import { NGXLogger } from 'ngx-logger';
import { ResponseStatus } from 'src/data/models/response-status.model';
import { StatusResponseService } from 'src/base/status-response.service';
import { IGeneralService } from 'src/domain/general/services/igeneral-service';

@Injectable({
  providedIn: 'root'
})
export class GeneralService extends IGeneralService {

  private url: string = environments.baseUrl;
  constructor(private _http: HttpClient, private _statusResponseService: StatusResponseService, private _logger: NGXLogger) { super(); }

  getCatalogoByCodPad(body: { codigoPadre: number }): Observable<CatalogoModel[]> {
    const url = `${this.url}/Catalogo/GetCatalogoByCodPad`
    return this._http.post<any>(url, body);
  }

  getPersonaByCi(body: { cedulaIdentidad: string }): Observable<ResponseStatus> {
    const url = `${this.url}/Persona/GetPersonaByCi`
    return this._http.post<any>(url, body).pipe(catchError(error => {
      return of(this._statusResponseService.error(error))
    }), map(res => {
      if (res.Ok) {
        return this._statusResponseService.ok(res);
      }
      return res;
    })
    );
  }
  
  getArchivoByCodTab(body: { codigoTabla: number, nombreTabla: string }): Observable<ResponseStatus> {
    const url = `${this.url}/General/GetArchivoByCodTab`
    return this._http.post<any>(url, body).pipe(catchError(error => {
      this._logger.error("Error al obtener los archivos", "/General/GetArchivoByCodTab", JSON.stringify(body));
      return of(this._statusResponseService.error(error))
    }), map(res => {
      if (res.Ok) {
        return this._statusResponseService.ok(res);
      }
      return res;
    })
    );
  }
}
