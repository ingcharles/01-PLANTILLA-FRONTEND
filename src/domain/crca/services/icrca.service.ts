import { Observable } from "rxjs";
import { ResponseStatus, ResponseStatusData } from "src/data/models/response-status.model";
import { CrcaAllModel } from "src/data/crca/models/crca-all.model";
import { CrcaNumerarioModel } from "src/data/crca/models/crca-numerario.model";
import { CrcaRSModel } from "src/data/crca/models/crca.model";
/** Clase absatracta que viene hacer los casos de uso y que varias apis puedan utilizar los casoos de usos */
/** Cuando utilicemos la capa de infraestructura extendamos del gateway y no del caso de uso  resumen: que queremos no del como   */
export abstract class ICrcaService {
  abstract getCrcaAll(body: { codigoContabilidad: number }): Observable<CrcaAllModel[]>;
  abstract getCrcaByCod(body: { codigoCrca: number }): Observable<CrcaRSModel>;
  abstract saveCrcaNumerario(crcaNumerario: CrcaNumerarioModel): Observable<ResponseStatus>;
  abstract updateCrcaNumerario(crcaNumerario: CrcaNumerarioModel): Observable<ResponseStatus>;
}
