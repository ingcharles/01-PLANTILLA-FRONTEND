import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './pages/index/index.component';
import { CreateComponent } from './pages/create/create.component';
import { DevextremeModule } from '../devextreme/devextreme.module';
import { AppRoutingModule } from './crca-routing.module';
import { CrcaIndexDataGridComponent } from './components/crca-index-data-grid/crca-index-data-grid.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DxValidatorModule } from 'devextreme-angular';
import { SharedModule } from '../shared/shared.module';
import { EstadoPipe } from '../pipes/estado.pipe';
import { CrcaService } from 'src/data/crca/services/crca.service';
import { ICrcaService } from 'src/domain/crca/services/icrca.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { IGeneralService } from 'src/domain/general/services/igeneral-service';
import { GeneralService } from 'src/data/general/general.service';



@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent,
    CrcaIndexDataGridComponent,
    EstadoPipe
  ],
  imports: [
    CommonModule,
    DevextremeModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    DxValidatorModule,
    SharedModule,
    SweetAlert2Module.forRoot()
  ],
  providers:[{ provide: ICrcaService,useClass: CrcaService},{ provide: IGeneralService,useClass: GeneralService}]
})
export class CrcaModule { }
