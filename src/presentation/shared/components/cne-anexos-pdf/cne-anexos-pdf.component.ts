import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup } from '@angular/forms';
// import { FileContent } from '../../interfaces/file.interface';

@Component({
  selector: 'cne-anexos-pdf',
  templateUrl: './cne-anexos-pdf.component.html',
  styleUrls: ['./cne-anexos-pdf.component.css']
})
export class CneAnexosPdfComponent {

  constructor(public _controlContainer: ControlContainer,private _formBuilder: FormBuilder) { }
  
  // para heredar la validacion del formulario
  @Input() public controlName: string='ninguno';
  public form: FormGroup=this._formBuilder.group({ninguno:[0]});

  ngOnInit(): void {
    if(this.controlName!='ninguno'){
      this.form=<FormGroup>this._controlContainer.control;
    }
  }

  items: any[] = [];
 
  get value(): any {
    return this.items;
  };

  @Input()
  set value(value: any[]) {
    this.items = value;
     this.valueChange.emit(value);
  };
  @Output() valueChange: EventEmitter<any[]> = new EventEmitter();

  onSelected(e:any){
    this.valueChange.emit(e.value);
  }
}
