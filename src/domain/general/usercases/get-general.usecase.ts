import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseStatus } from 'src/data/models/response-status.model';
import { IGeneralService } from '../services/igeneral-service';
import { CatalogoModel } from 'src/data/models/catalogo.model';
/**
 * Los casos de uso solo definen como se comporta nuestro sistema,
 * definiendo los datos de entrada necesarios, y cual será su salida.
 * Los cambios en esta capa no deberían afectar a las entidades,
 * al igual que los cambios en otras capas externas no deberían afectar
 * a los casos de uso.
 */

@Injectable({ providedIn: 'root' })
export class GetGeneralUseCase {
  constructor(private iGeneralService: IGeneralService) { }

  getCatalogoByCodPad(body: {codigoPadre:number}): Observable<CatalogoModel[]> {
    return this.iGeneralService.getCatalogoByCodPad(body);
  }

  getPersonaByCi(body: {cedulaIdentidad:string}): Observable<ResponseStatus> {
    return this.iGeneralService.getPersonaByCi(body);
  }
  getArchivoByCodTab(body: { codigoTabla: number, nombreTabla: string }): Observable<ResponseStatus> {
    return this.iGeneralService.getArchivoByCodTab(body);
  }

}
