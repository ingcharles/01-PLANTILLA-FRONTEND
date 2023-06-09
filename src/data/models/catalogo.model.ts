export interface CatalogoModel {
  codigoCatalogo:     number | null;
  codigoUnico:        number | null;
  codigoPadre:        number | null;
  descripcion:        string | null;
  estado:             number | null;
  fechaCreacion:      Date | null;
  fechaActualización: Date | null;
}
