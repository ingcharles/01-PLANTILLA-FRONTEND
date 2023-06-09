// Generated by https://quicktype.io

export interface CrcaNumerarioModel {
  auditoria:string;
  claseCrca?: ClaseCrca;
  claseArchivo?: ClaseArchivo[];
}

export interface ClaseArchivo {
  tipoArchivo?: number | null;
  tipoExtension?: number | null;
  descripcion?: string | null;
  nombre?: string | null;
  documento?: string | null;
  estado?: number | null;
  fechaFirma?: string | null;
  localizacionFirma?: string | null;
  ruta?: string | null;
  estadoFirma?: string | null;
}

export interface ClaseCrca {
  codigoCrca?:number | null;
  codigoCatalogoTipoCrca: number | null;
  codigoCatalogoTipoAporteCrca: number | null;
  codigoDatoPersonal: number | null;
  codigoContabilidad: number | null;
  fechaRecepcion: Date | null;
  valorLetras: string | null;
  valorNumero: number | null;
  detalleAporte: string | null;
  detalleAporteEspecie: string | null;
}
