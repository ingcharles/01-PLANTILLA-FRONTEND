import { IMapper } from 'src/base/imapper';
import { PersonaModel } from 'src/data/models/persona.model';
import { PersonaRSViewModel, PersonaViewModel } from 'src/domain/viewModels/persona.viewModel';
import { CrcaAllModel } from '../models/crca-all.model';
import { ClaseArchivo, CrcaNumerarioModel } from '../models/crca-numerario.model';
import { CrcaAllViewModel } from 'src/domain/crca/viewModels/crca-all.viewModel';
import { CrcaModel, CrcaRSModel } from '../models/crca.model';
import { CrcaNumerarioViewModel } from 'src/domain/crca/viewModels/crca-numerario.viewModel';
import { CrcaRSViewModel, CrcaViewModel } from 'src/domain/crca/viewModels/crca.viewModel';
import { ListArchivo } from 'src/presentation/shared/interfaces/list-archivo.inteface';
import { messages } from '../../../base/messages';



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
  mapCrcaFrom(item: CrcaRSModel): CrcaRSViewModel {
    console.log("maper", item.data)
    return {message:item.message,
      ok:item.ok,
      statusCode:item.statusCode,
      data:{
      codigoCrca: item.data!.codigoCrca,
      codigoDatoPersonal: item.data!.codigoDatoPersonal,
      codigoCatalogoTipoCrca: item.data!.codigoCatalogoTipoCrca,
      codigoCatalogoTipoAporteCrca: item.data!.codigoCatalogoTipoAporteCrca,
      codigoContabilidad: item.data!.codigoContabilidad,
      dniAportante: item.data!.dniAportante,
      tipoEspecie: item.data!.tipoEspecie,
      fechaRecepcion: item.data!.fechaRecepcion,
      valorNumero: item.data!.valorNumero,
      valorLetras: item.data!.valorLetras,
      detalleAporte: item.data!.detalleAporte,
      detalleAporteEspecie: item.data!.detalleAporteEspecie,
      estado: item.data!.estado,
      nombreAportante: item.data!.nombreAportante,
      documentos: null,
    }};

  }

  /** Recibe y mapea los datos que vienen desde el servicio  hacia la vista*/
  mapPersonaByCiFrom(item: any ): PersonaRSViewModel {
    return {
      message: item.message,
      statusCode: item.statusCode,
      ok: item.ok,
      data: item.data? {
        codPersona: item.data.codigoPersona,
        cedula: item.data.cedulaIdentidad,
        nombres: item.data.apellidosNombres
      } : null
    }
  }

  /** Recibe y mapea los datos que vienen de la vista hacia el servicio */
  async mapCrcaNumerarioTo(item: CrcaNumerarioViewModel): Promise<CrcaNumerarioModel> {
    let data: ClaseArchivo[] = [];
    const claseadd=await this.filesToUint8Arrays(item.documentos!);

     const valor= {
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
      }, claseArchivo: claseadd as ClaseArchivo[],
      auditoria: "2edf8b3e2f5a424fa8333ba742154869|1202|151|192.168.1.1|Chrome|I|Guardar información del Crca en Numerario|01"
    }
    console.log("valor",valor)

    return valor;

  }
  async filesToUint8Arrays(files: ListArchivo[]): Promise<ClaseArchivo[]> {
    const filePromises = files.map(async(file) => await this.fileToUint8Arrayfor(file));
    return Promise.all(filePromises);
  }
  async fileToUint8Arrayfor(file: ListArchivo): Promise<ClaseArchivo>  {
    return new Promise((resolve, reject) => {      
        file.file.arrayBuffer().then((e: any) => {
          const uint8Array = new Uint8Array(e);
          const arrayBuffer = uint8Array.buffer;
          const intArray = Array.from(uint8Array);
          // Convierte el array de números enteros a una cadena de texto
          const textString = String.fromCharCode(...intArray);
          // Codifica el Uint8Array a una cadena en formato Base64
          const base64String = btoa(textString);
          // creacion del formato en la que se devuelve
          const data={ documento: base64String, tipoArchivo: 46, tipoExtension: null, descripcion: file.description, nombre: file.name, estado: 1 };
          // this.documentoBase64.push(base64String)
          resolve(data);
        });
    });
  }

  //  async fileToUint8Array(file: File): Promise<ClaseArchivo> {
  //   console.log("fileToUint8Array");
    
    
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       const arrayBuffer = reader.result as ArrayBuffer;
  //       const uint8Array = new Uint8Array(arrayBuffer);
  //       const intArray = Array.from(uint8Array);
  //       // Convierte el array de números enteros a una cadena de texto
  //       const textString = String.fromCharCode(...intArray);
  //       // Codifica el Uint8Array a una cadena en formato Base64
  //       const base64String = btoa(textString);
  //       console.log("base64");
  //       return base64String;
  //       //  resolve(base64String);
  //     };

  //     // reader.onerror = () => {
  //     //   reject(new Error("Failed to read the file."));
  //     // };

  //     const variable=  reader.readAsArrayBuffer(file);
  //     console.log("result",variable);
  //     const a:ClaseArchivo={};
  // return a;
  // }
  
}
