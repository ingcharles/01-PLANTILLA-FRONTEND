import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'cne-alerts',
  templateUrl: './cne-alerts.component.html',
  styleUrls: ['./cne-alerts.component.css']
})
export class CneAlertsComponent implements OnInit {
 
  
  ngOnInit(): void {
  console.log("init",this.title)
  }
constructor(private deleteRecord: SwalComponent){
 
  console.log("constructor");
  console.log("entro",this.deleteRecord);

}
  @Input()
  title:string="defecto";

  @Input()
 mostrarAlerta(valor:string){
  
  
  // if(valor){
  //  this.deleteRecord.fire();
  // }

}
  // @Output() confirm: EventEmitter<any> = new EventEmitter();

}