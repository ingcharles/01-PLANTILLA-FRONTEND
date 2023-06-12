import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { CatalogoModel } from 'src/data/models/catalogo.model';
import { PersonaModel } from 'src/data/models/persona.model';
import { ICrcaService } from '../services/icrca.service';
import { CrcaAllModel } from 'src/data/crca/models/crca-all.model';
import { ResponseStatus, ResponseStatusData } from 'src/data/models/response-status.model';
import { CrcaRSModel } from 'src/data/crca/models/crca.model';
/**
 * Los casos de uso solo definen como se comporta nuestro sistema,
 * definiendo los datos de entrada necesarios, y cual será su salida.
 * Los cambios en esta capa no deberían afectar a las entidades,
 * al igual que los cambios en otras capas externas no deberían afectar
 * a los casos de uso.
 */

@Injectable({ providedIn: 'root' })
export class GetCrcaUseCase {
  constructor(private iCrcaService: ICrcaService) { }

  getCrcaAll(body: {codigoContabilidad:number}): Observable<CrcaAllModel[]> {
    //TODO: En este sitio podríamos manejar las configuraciones
    //en cache
    return this.iCrcaService.getCrcaAll(body);
  }

  getCrcaByCod(body: {codigoCrca:number}): Observable<CrcaRSModel> {
    return this.iCrcaService.getCrcaByCod(body);
  }

}
