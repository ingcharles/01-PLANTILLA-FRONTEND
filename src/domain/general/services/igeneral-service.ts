import { Observable } from "rxjs";
import { CatalogoModel } from "src/data/models/catalogo.model";
import { ResponseStatus } from "src/data/models/response-status.model";
import { CrcaAllModel } from "src/data/crca/models/crca-all.model";
import { CrcaNumerarioModel } from "src/data/crca/models/crca-numerario.model";
/** Clase absatracta que viene hacer los casos de uso y que varias apis puedan utilizar los casoos de usos */
/** Cuando utilicemos la capa de infraestructura extendamos del gateway y no del caso de uso  resumen: que queremos no del como   */
export abstract class IGeneralService {
  abstract getCatalogoByCodPad(body: { codigoPadre: number }): Observable<CatalogoModel[]>;
  abstract getPersonaByCi(body: { cedulaIdentidad: string }): Observable<ResponseStatus>;
  abstract getArchivoByCodTab(body: { codigoTabla: number, nombreTabla: string }): Observable<ResponseStatus>;
}