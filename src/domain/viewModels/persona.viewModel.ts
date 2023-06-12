import { ResponseStatus } from "src/data/models/response-status.model";

export interface PersonaRSViewModel extends  ResponseStatus{
 data?:PersonaViewModel | null;
}
export interface PersonaViewModel{
  codPersona:number | null;
  cedula:string | null;
  nombres:string | null;
}