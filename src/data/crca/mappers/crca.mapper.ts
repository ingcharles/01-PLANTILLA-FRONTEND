import { IMapper } from 'src/base/imapper';
import { PersonaModel } from 'src/data/models/persona.model';
import { PersonaViewModel } from 'src/domain/viewModels/persona.viewModel';
import { CrcaAllModel } from '../models/crca-all.model';
import { ClaseArchivo, CrcaNumerarioModel } from '../models/crca-numerario.model';
import { CrcaAllViewModel } from 'src/domain/crca/viewModels/crca-all.viewModel';
import { CrcaModel } from '../models/crca.model';
import { CrcaNumerarioViewModel } from 'src/domain/crca/viewModels/crca-numerario.viewModel';
import { CrcaViewModel } from 'src/domain/crca/viewModels/crca.viewModel';



export class CrcaMapper extends IMapper<any, any> {
  /** Recibe y mapea los datos que vienen desde el servicio  hacia la vista*/
  mapCrcaAllFrom(param: CrcaAllModel[]): CrcaAllViewModel[] {
    return param.map((item: CrcaAllModel) => {
      return {
        codigoCrca: item.codigoCrca,
        codigoDatoPersonal: item.codigoDatoPersonal,
        codigoCatalogoTipoCrca: item.codigoCatalogoTipoCrca,
        codigoCatalogoTipoAporteCrca: item.codigoCatalogoTipoAporteCrca,
        dniAportante: item.dniAportante,
        nombreAportante: item.nombreAportante,
        tipoEspecie: item.tipoEspecie,
        fechaRecepcion: item.fechaRecepcion,
        valorNumero: item.valorNumero,
        valorLetras: item.valorLetras,
        detalleAporte: item.detalleAporte,
        detalleAporteEspecie: item.detalleAporteEspecie,
        estado: item.estado,
        estadoFormulario: item.estadoFormulario
      };
    })
  }
  /** Recibe y mapea los datos que vienen de la vista hacia el servicio */
  mapCrcaAllTo(param: CrcaAllViewModel[]): CrcaAllModel[] {
    return param.map((item: CrcaAllViewModel) => {
      return {
        codigoCrca: item.codigoCrca,
        codigoDatoPersonal: item.codigoDatoPersonal,
        codigoCatalogoTipoCrca: item.codigoCatalogoTipoCrca,
        codigoCatalogoTipoAporteCrca: item.codigoCatalogoTipoAporteCrca,
        dniAportante: item.dniAportante,
        nombreAportante: item.nombreAportante,
        tipoEspecie: item.tipoEspecie,
        fechaRecepcion: item.fechaRecepcion,
        valorNumero: item.valorNumero,
        valorLetras: item.valorLetras,
        detalleAporte: item.detalleAporte,
        detalleAporteEspecie: item.detalleAporteEspecie,
        estado: item.estado,
        estadoFormulario: item.estadoFormulario
      };
    })
  }

  /** Recibe y mapea los datos que vienen desde el servicio  hacia la vista*/
  mapCrcaFrom(item: CrcaModel): CrcaViewModel {
   return {
        codigoCrca: item.codigoCrca,
        codigoDatoPersonal: item.codigoDatoPersonal,
        codigoCatalogoTipoCrca: item.codigoCatalogoTipoCrca,
        codigoCatalogoTipoAporteCrca: item.codigoCatalogoTipoAporteCrca,
        codigoContabilidad: item.codigoContabilidad,
        dniAportante: item.dniAportante,
        tipoEspecie: item.tipoEspecie,
        fechaRecepcion: item.fechaRecepcion,
        valorNumero: item.valorNumero,
        valorLetras: item.valorLetras,
        detalleAporte: item.detalleAporte,
        detalleAporteEspecie: item.detalleAporteEspecie,
        estado: item.estado,
        nombreAportante:item.nombreAportante,
        documentos: null,
      };

  }

  /** Recibe y mapea los datos que vienen desde el servicio  hacia la vista*/
  mapPersonaByCiFrom(item: PersonaModel): PersonaViewModel {
    return {
      codPersona: item.codigoPersona,
      cedula: item.cedulaIdentidad,
      nombres: item.apellidosNombres
    }
  }

  /** Recibe y mapea los datos que vienen de la vista hacia el servicio */
  async mapCrcaNumerarioTo(item: CrcaNumerarioViewModel): Promise<CrcaNumerarioModel> {
    let claseadd: ClaseArchivo[] = [];
    await this.filesToUint8Arrays(item.documentos!).then(result => {
      result.map(r => {
        claseadd.push({ documento: r, tipoArchivo: 46, tipoExtension: null, descripcion: null, nombre: 'asssaaafdff.pdf', estado: 1 });
      })
    });

    console.log("asasg", claseadd);
    const valor = {
      claseCrca: {
        codigoCrca: item.codigoCrca,
        codigoContabilidad: item.codigoContabilidad,
        codigoDatoPersonal: item.codigoDatoPersonal,
        codigoCatalogoTipoCrca: item.codigoCatalogoTipoCrca,
        codigoCatalogoTipoAporteCrca: item.codigoCatalogoTipoAporteCrca,
        fechaRecepcion: item.fechaRecepcion,
        valorNumero: item.valorNumero,
        valorLetras: item.valorLetras,
        detalleAporte: item.detalleAporte,
        detalleAporteEspecie: item.detalleAporteEspecie,
        //estado: item.estado,
        //estadoFormulario: item.estadoFormulario
      }, claseArchivo: claseadd,
      auditoria: "2edf8b3e2f5a424fa8333ba742154869|1202|151|192.168.1.1|Chrome|I|Guardar información del Crca en Numerario|01"
    }
    console.log("valor", JSON.stringify(valor));

    return valor;

  }
  async filesToUint8Arrays(files: File[]): Promise<string[]> {
    const filePromises = files.map((file) => this.fileToUint8Array2(file));
    return Promise.all(filePromises);
  }

  async fileToUint8Array2(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const uint8Array = new Uint8Array(arrayBuffer);
        const intArray = Array.from(uint8Array);
        // Convierte el array de números enteros a una cadena de texto
        const textString = String.fromCharCode(...intArray);
        // Codifica el Uint8Array a una cadena en formato Base64
        const base64String = btoa(textString);

        resolve(base64String);
      };

      reader.onerror = () => {
        reject(new Error("Failed to read the file."));
      };

      reader.readAsArrayBuffer(file);
    });
  }
}
