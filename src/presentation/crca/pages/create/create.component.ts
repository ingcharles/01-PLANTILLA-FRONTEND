import { Component, OnInit, ViewChild, Pipe, AfterContentInit } from '@angular/core';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import * as customValidators from 'src/base/validators';
import { messages } from 'src/base/messages';
import * as catalogo from 'src/base/constants';
import { GetCrcaUseCase } from 'src/domain/crca/usecases/get-crca.usecase';
import { SaveCrcaUseCase } from 'src/domain/crca/usecases/save-crca.usecase';
import { Archivo } from 'src/domain/viewModels/archivo.viewModel';
import { CrcaMapper } from 'src/data/crca/mappers/crca.mapper';
import { event } from 'devextreme/events';
import * as numeroLetras from 'src/js/numeroALetras';
import { CneAlertsComponent } from 'src/presentation/shared/components/cne-alerts/cne-alerts.component';
import { AlertsService } from 'src/base/alerts.service';
import { GetGeneralUseCase } from 'src/domain/general/usercases/get-general.usecase';
import { UpdateCrcaUseCase } from 'src/domain/crca/usecases/update-crca.usecase';
import { CrcaNumerarioViewModel } from 'src/domain/crca/viewModels/crca-numerario.viewModel';
import { ListArchivo } from 'src/presentation/shared/interfaces/list-archivo.inteface';
import { PersonaRSViewModel } from 'src/domain/viewModels/persona.viewModel';
@Component({
  providers: [CrcaMapper],
  selector: 'create-crca',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {



  constructor(private fb: FormBuilder,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private _getCrcaUseCase: GetCrcaUseCase,
    private _getGeneralUseCase: GetGeneralUseCase,
    private _saveCrcaUseCase: SaveCrcaUseCase,
    private _updateCrcaUseCase: UpdateCrcaUseCase,
    private _crcaMapper: CrcaMapper,
    private _alertService: AlertsService,
  ) {  }
 

  public bandera:number=0;
  @ViewChild('deleteRecord')
  public deleteRecord!: CneAlertsComponent;

  public mostrar = "";
  /**  obtener los mensajes de la alertas configuradas en base/messages.ts */
  public menssage = messages;

  /** Variable para cambiar de nombre al boton guardar o Actualizar */
  public nameSaveUpdate: string = 'Guardar';

  /** objeto de tipo ClaseArchivo array */
  public arrayClaseArchivo: Archivo[] = [];

  public listArchivos: ListArchivo[] = [];

  /** variable para almacenar tipo de aportante  */
  public tipoAportante: any[] = [];

  /** variable para almacenar aporte en  */
  public aporteEn: any[] = [];

  public descriptionArchivo: string = '';

  archivos: any[] = [];
  /** creacion de variables y validación del formulario */
  formCrca: FormGroup = this.fb.group({
    codigoCrca: [null],
    dniAportante: ['', [Validators.required, Validators.minLength(10), Validators.pattern(customValidators.twoDecimal)]],
    nombreAportante: ['', [Validators.required]],
    codigoCatalogoTipoCrca: [26, [Validators.required]],
    codigoCatalogoTipoAporteCrca: [null, [Validators.required]],
    codigoDatoPersonal: [21, [Validators.required]],
    codigoContabilidad: [1],
    fechaRecepcion: ['', [Validators.required]],
    valorLetras: ['', [Validators.required]],
    valorNumero: [null, [Validators.required, Validators.pattern(customValidators.twoDecimal)]],
    detalleAporte: ['', [Validators.required]],
    detalleAporteEspecie: ['detalle', [Validators.required]],
    estado: [1, [Validators.required]],
    documentos: [
      []
    ]
  });
  select2(e: any) {
    console.log(this.archivos);
  }
  agregarArchivo(e: event) {
    // e.preventDefault;
    this.listArchivos.push({ name: this.archivos[0].name, description: this.descriptionArchivo, file: this.archivos[0] });
    this.archivos = [];
    this.descriptionArchivo = '';
    this.formCrca.value["documentos"] = this.listArchivos;
  }
  // /**
  //  *  Se ejecuta al cargar este componente
  //  * @returns
  //  */
  ngOnInit(): void {

    //servicio para obtener aporte en
    let bodyCrca: { codigoPadre: number } = { codigoPadre: catalogo.COD_CAT_TIP_APO_CRCA };
    this._getGeneralUseCase.getCatalogoByCodPad(bodyCrca).subscribe(
      result => {
        if (result) {
          this.aporteEn = result;
        }
      }
    );
    // servicio para obtener tipo de aportante
    // codPadre = { codigoPadre: 21 };
    // this.crcaService.GetCatalogoByCodPad(codPadre).subscribe(
    //   result => {
    //     if (result) {
    //       this.tipoAportante = result;
    //     }
    //   }
    // );
    //** entra cuando es crear y retorna vacio */
    if (!this.router.url.includes('edit'))
    {
      this.bandera=1;
      return;
    } 
    /**Cambia el nombre del boton si entra al formulario edit */
    this.nameSaveUpdate = 'Actualizar';
    //** entra cuando es edit y obtiene el parametro para consultar al servicio de crca */
    this._activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
         return this._getCrcaUseCase.getCrcaByCod({codigoCrca:parseInt(atob(id))})
        }),
      ).pipe(
        map(result=>this._crcaMapper.mapCrcaFrom(result))
      )
      .subscribe(resultCrca => {
        console.log(resultCrca);
        if (!resultCrca) {
          /** Retorna a la ruta raiz  */
          return this.router.navigateByUrl('/crca');
        }
            /** se ejecuta cuando no encuentra una persona */
            if (!resultCrca.ok) {
              // this.formCrca.reset({ ...this.formCrca.value, nombreAportante: null, codigoDatoPersonal: catalogo.COD_DAT_PERSONAL })
              this._alertService.alertMessage("Advertencia!", resultCrca.message, 'warning');
              return;
            }
            /** se ejecuta cuando no encuentra una persona */
            if (resultCrca.ok) {
              //  const mapResultCrca = this._crcaMapper.mapCrcaFrom(resultCrca.data);
              const bodyArchivo = { codigoTabla: resultCrca.data!.codigoCrca, nombreTabla: 'CRCA' };

              this._getGeneralUseCase.getArchivoByCodTab(bodyArchivo).subscribe(resultArchivo => {
                console.log(resultArchivo);

                if (!resultArchivo) {
                  return;
                  // return this.router.navigateByUrl('/');
                }

                const archivoTemp: any[] = [];
                // for (let index = 0; index < resultArchivo.data.length; index++) {
                //  // archivoTemp.push({ base64String: resultArchivo.data[index]["documento"], name: resultArchivo.data[index]["nombre"], size: 0, type: 'pdf' });
                //   this.listArchivos.push({ name: resultArchivo.data[index]["nombre"], description: resultArchivo.data[index]["descripcion"], file: resultArchivo.data[index]["documento"] });
                
                // }
               // this.archivos = archivoTemp;
               console.log("this.listArchivos.",JSON.stringify(this.listArchivos));
                return;
              })
             
              this.formCrca.reset( resultCrca.data);
              this.bandera=1;
            }


        //console.log("resultCrca.data"+resultCrca.data);

        /** Objeto cuerpo para enviar al servicio */

        return;
      });
  }
  // /** Obtener el valor del formulario convertir a tipo ClaseCrca */
  get currentCrca(): CrcaNumerarioViewModel {
    const crca = this.formCrca.value as CrcaNumerarioViewModel;
    return crca;
  }

  convertirNumero(e: event) {
    if (this.formCrca.value["valorNumero"] === null) {
      this.formCrca.value["valorLetras"] = '';
      return;
    }
    this.formCrca.value["valorLetras"] = numeroLetras.numeroALetras(this.formCrca.value["valorNumero"]);
  }
  // /**
  //  *  guardar o actualizar crca
  //  * @param event
  //  * @returns
  //  */
  async guardar() {

    /** Verificar si el formulario esta valido */
    if (this.formCrca.invalid) {
      this.formCrca.markAllAsTouched();
      alert("Campos vacios");
      return;
    };

    if (!this.archivos) {
      alert("no tiene archivos de respaldo");
      return;
    }
    /** Convertir el array de archivos a un tipo Clase Archivo antes de enviar al servicio */
    this.archivos?.forEach(element => {
      this.arrayClaseArchivo.push({ documento: element.base64String, tipoExtension: null, nombre: element.name, descripcion: "gasgas", tipoArchivo: 46, estado: 1, fechaFirma: "2023-05-23T18:45:59.402Z", estadoFirma: null, localizacionFirma: null, ruta: null });
    });
    /** Variables con todos lo campos que necesita el servicio */
    //const crcaNumerario: CrcaNumerario = { auditoria: "2edf8b3e2f5a424fa8333ba742154869|1202|151|192.168.1.1|Chrome|I|Guardar información del Crca en Especie|01" };
    /** Entra al if si existe el codigoCrca o esta vacio --- Nuevo o editar */
    if (this.currentCrca.codigoCrca) {
      alert("entro en actualizar")
      this._updateCrcaUseCase.updateCrcaNumerario( this.currentCrca )
        .subscribe( result => {
          console.log(result)

          // this.showSnackbar(`${ hero.superhero } updated!`);
        });
      return;
    }
    /** Se ejecuta el servicio solo si no cumple con el if anterior
     * esto siempre y cuando viene por Nuevo
     */

    this._saveCrcaUseCase.saveCrcaNumerario(await this._crcaMapper.mapCrcaNumerarioTo(this.formCrca.value as CrcaNumerarioViewModel)).subscribe(
      result => {
         if (result.ok) {
          this._alertService.alertMessage("Advertencia!", result.message, 'success');
         } else {
          this._alertService.alertMessage("Advertencia!", result.message, 'warning');
         }
      }
    );
    return;
  }

  // /**
  //  * valida si el campo es valido
  //  * @param field nombre del campo colocado el fieldControlName
  //  * @returns true o false
  //  */
  isValidField(field: string): boolean | null {
    // obterner validacion de servicio
    return this.formCrca.controls[field].errors && this.formCrca.controls[field].touched;
  }

  /**
   * Method para salir del formulario y navegar a la pantalla principal
   * @param event evento que se ejecuta al dar clic en el boton
   */
  salirFormulario(event: any) {
    event.preventDefault;
    /** navegar al formulario que esta configurado en app-routing.module.ts */
    this.router.navigateByUrl('');
  }

  /**
 * Method para buscar persona por Cedula
 * @param
 */
  buscarPersona() {
    if(this.bandera==0)
      return;
 
      
   
    const dni = this.formCrca.value['dniAportante'];
    if (dni.length < 10)
      return this._alertService.alertMessage("Advertencia!", messages.min10Character, 'warning');
    if (dni.length != 10 && dni.length != 13)
      return this._alertService.alertMessage("Advertencia!", messages.dniValid, 'warning');

    //servicio para obtener información de la persona
    let body: any = { cedulaIdentidad: this.formCrca.value['dniAportante'] };
    this._getGeneralUseCase.getPersonaByCi(body).pipe(map(data=>{
      console.log("data",data);
      return this._crcaMapper.mapPersonaByCiFrom(data)}
      )).subscribe(
      result => {
        console.log("result",result)
        /** se ejecuta cuando no encuentra una persona */
        if (!result.ok) {
          this.formCrca.reset({ ...this.formCrca.value, nombreAportante: null, codigoDatoPersonal: catalogo.COD_DAT_PERSONAL })
          this._alertService.alertMessage("Advertencia!", result.message, 'warning');
          return;
        }
        console.log(result);
        /** se ejecuta cuando no encuentra una persona */
        if (result.ok) {
          // const mapResult = this._crcaMapper.mapPersonaByCiFrom(result.data);
          this.formCrca.reset({ ...this.formCrca.value, nombreAportante: result.data?.nombres, codigoDatoPersonal: catalogo.COD_DAT_PERSONAL })
        }

      }
    );

  }
  // cambioss(eve: any) {
  //   this.archivos = eve;
  //   console.log("cambios", eve);
  // }
  // mostrarswal() {
  //   // const a=Swal.fire({
  //   //   title:"asgasg"
  //   //  })
  //   // this.deleteRecord.swalOptions.title="asgas";
  //   // this.deleteRecord.on
  //   // this._alertService.alertMessage("titulo","subtitulo","success");
  //   this._alertService.alertConfirm("Advertencia", "¿Está seguro de registrar el Crca?", () => this.mostrarSwalMessage(this._alertService))
  //   // this.mostrar="asgas"+Math.random();
  //   // this.deleteRecord.fire();

  // }

  // mostrarSwalMessage(alertService: AlertsService) {
  //   console.log("prueba Alert")
  //   alertService.alertMessage("Exito", "El Crca fue registrado exitosamente!", "success");
  // }
}

