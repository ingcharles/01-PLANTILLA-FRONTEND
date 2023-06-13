import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxFileUploaderModule, DxDateBoxModule, DxNumberBoxModule, DxButtonModule, DxSelectBoxModule, DxValidatorModule, DxDataGridModule, DxFormModule, DxTextBoxModule, DxTextAreaModule } from 'devextreme-angular';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],exports:[   
    DxFileUploaderModule,
    DxButtonModule,
    DxSelectBoxModule,
    DxValidatorModule,
    ReactiveFormsModule,
    DxDataGridModule,
    DxFormModule,
    DxTextBoxModule,
    DxTextAreaModule,
    DxDateBoxModule,
    DxNumberBoxModule
  ]
})
export class DevextremeModule { }
