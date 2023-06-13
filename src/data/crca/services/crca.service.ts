import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environments } from 'src/environments/environments';
import { PersonaModel } from 'src/data/models/persona.model';
import { CatalogoModel } from 'src/data/models/catalogo.model';
import { NGXLogger } from 'ngx-logger';
import { ResponseStatus, ResponseStatusData } from 'src/data/models/response-status.model';
import { ICrcaService } from 'src/domain/crca/services/icrca.service';
import { CrcaAllModel } from '../models/crca-all.model';
import { CrcaNumerarioModel } from '../models/crca-numerario.model';
import { StatusResponseService } from 'src/base/status-response.service';
import { CrcaRSModel } from '../models/crca.model';

@Injectable({
  providedIn: 'root'
})
export class CrcaService extends ICrcaService {

  private url: string = environments.baseUrl;
  constructor(private _http: HttpClient, private _statusResponseService: StatusResponseService, private _logger: NGXLogger) { super(); }

  getCrcaAll(body: { codigoContabilidad: number }): Observable<CrcaAllModel[]> {
    const url = `${this.url}/Crca/GetCrcaAll`
    return this._http.post<any>(url, body);
  }

  getCrcaByCod(body: { codigoCrca: number }): Observable<CrcaRSModel> {
    const url = `${this.url}/Crca/GetCrcaByCod`
    return this._http.post<any>(url, body).pipe(catchError(error => {
      this._logger.error("Error al obtener los datos del crca", "/Crca/GetCrcaByCod", JSON.stringify(body));
      return of(this._statusResponseService.error(error))
    })
    );
  }

  saveCrcaNumerario(crcaNumerario: CrcaNumerarioModel): Observable<ResponseStatus> {
    console.log("asfcrcaNumerario",crcaNumerario);
    const url = `${this.url}/Crca/SaveCrcaNumerario`;
    return this._http.post<any>(url, crcaNumerario).pipe(catchError(error => {
      this._logger.error("Error al insertar un Crca en numerario", "/Crca/SaveCrcaNumerario", JSON.stringify(crcaNumerario));
      return of(error)
    }));
  }

  updateCrcaNumerario(crcaNumerario: CrcaNumerarioModel): Observable<ResponseStatus> {
    const url = `${this.url}/Crca/UpdateCrcaNumerario`;
    return this._http.post<any>(url, crcaNumerario).pipe(catchError(error => {
      this._logger.error("Error al actualizar un Crca en numerario", "/Crca/UpdateCrcaNumerario", JSON.stringify(crcaNumerario));
      return of(error)
    }));
  }
}
