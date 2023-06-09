import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevextremeModule } from '../devextreme/devextreme.module';
import { CneSelectBoxComponent } from './components/cne-select-box/cne-select-box.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CneListAnexosComponent } from './components/cne-list-anexos/cne-list-anexos.component';
import { CneAnexosPdfComponent } from './components/cne-anexos-pdf/cne-anexos-pdf.component';
import { CneAlertsComponent } from './components/cne-alerts/cne-alerts.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';



@NgModule({
  declarations: [
    CneSelectBoxComponent,
    CneAnexosPdfComponent,
    CneListAnexosComponent,
    CneAlertsComponent,

  ],
  imports: [
    CommonModule,
    DevextremeModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot()

  ],
  providers: [
    
  ],
  exports:[
    CneSelectBoxComponent,
    CneAnexosPdfComponent,
    CneListAnexosComponent,
    CneAlertsComponent
    
  ],
  bootstrap: []
})
export class SharedModule { }