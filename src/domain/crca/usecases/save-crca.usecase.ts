import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { ResponseStatus } from 'src/data/models/response-status.model';

import { CrcaNumerarioModel } from 'src/data/crca/models/crca-numerario.model';
import { ICrcaService } from '../services/icrca.service';
import { CrcaRSModel } from 'src/data/crca/models/crca.model';

/**
 * Los casos de uso solo definen como se comporta nuestro sistema,
 * definiendo los datos de entrada necesarios, y cual será su salida.
 * Los cambios en esta capa no deberían afectar a las entidades,
 * al igual que los cambios en otras capas externas no deberían afectar
 * a los casos de uso.
 */

@Injectable({ providedIn: 'root' })
export class SaveCrcaUseCase {
  constructor(private iCrcaService : ICrcaService) { }


  saveCrcaNumerario(CrcaNumerario: CrcaNumerarioModel): Observable<CrcaRSModel> {
    console.log("CrcaNumerario",CrcaNumerario);
    return this.iCrcaService.saveCrcaNumerario(CrcaNumerario);

  }

}
