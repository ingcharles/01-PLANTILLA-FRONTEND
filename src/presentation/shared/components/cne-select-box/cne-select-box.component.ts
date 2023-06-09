import { Component, EventEmitter, Input, Output, SkipSelf } from '@angular/core';
import {ControlContainer, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'cne-select-box',
  templateUrl: './cne-select-box.component.html',
  styleUrls: ['./cne-select-box.component.css'],

})
export class CneSelectBoxComponent {

  constructor(public _controlContainer: ControlContainer,private _formBuilder: FormBuilder) { }
  
  // para heredar la validacion del formulario
  @Input() public controlName: string='ninguno';
  public form: FormGroup=this._formBuilder.group({ninguno:[0]});

  ngOnInit(): void {
    if(this.controlName!='ninguno'){
      this.form=<FormGroup>this._controlContainer.control;
    }
  }

  @Input()
  dataSource: any[] = [];
  @Input()
  placeholder: string = 'Seleccione...'
  @Input()
  displayExpr?: String = "name";

  @Input()
  valueExpr?: string = "id";

  boxValue: number = 0;

  get value(): number {
    return this.boxValue;
  };

  @Input()
  set value(value: number) {
    this.boxValue = value;
    this.valueChange.emit(value);
  };
  @Output() valueChange: EventEmitter<number> = new EventEmitter();

  @Output() onSelectionChanged: EventEmitter<any> = new EventEmitter();
}
