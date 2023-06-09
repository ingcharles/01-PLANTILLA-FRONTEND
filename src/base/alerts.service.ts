import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { messages } from './messages';

@Injectable({ providedIn: 'root' })
export class AlertsService {
  constructor() { }
  alertMessage(title: string, message: string ='', icono: SweetAlertIcon) {
    Swal.fire({
      title: title,
      text: message,
      icon:icono,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar',
    })
  }
  alertConfirm(title: string, message: string,fun:Function) {
    Swal.fire({
      title: title,
      text: message,
      icon:'question',
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      
  
    }).then((result) => {
      if (result.isConfirmed) {
  
      fun();
     
      }
    })
  }
}
