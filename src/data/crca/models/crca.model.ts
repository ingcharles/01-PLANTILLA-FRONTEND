export interface CrcaModel {
  codigoCrca: number;
  codigoDatoPersonal: number | null;
  codigoCatalogoTipoCrca: number | null;
  codigoCatalogoTipoAporteCrca: number | null;
  codigoContabilidad: number | null;
  dniAportante: string | null;
  tipoEspecie: string | null;
  fechaRecepcion: Date | null;
  valorNumero: number | null;
  valorLetras: string | null;
  detalleAporte: string | null;
  detalleAporteEspecie: string | null;
  nombreAportante:string;
  estado: number | null;
}