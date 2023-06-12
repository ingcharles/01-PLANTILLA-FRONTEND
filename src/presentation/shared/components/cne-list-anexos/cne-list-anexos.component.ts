import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListArchivo } from '../../interfaces/list-archivo.inteface';

@Component({
  selector: 'cne-list-anexos',
  templateUrl: './cne-list-anexos.component.html',
  styleUrls: ['./cne-list-anexos.component.css']
})
export class CneListAnexosComponent {
  @Input()
  public datasource: ListArchivo[] = [];
  Delete(index: number) {
    this.datasource.splice(index, 1);
  }

  get value():ListArchivo[] {
    return this.datasource;
  };

  @Input()
  set value(value:ListArchivo[]) {
    console.log("entro en value");
    this.datasource = value;
    this.valueChange.emit(value);
  };
  @Output() valueChange: EventEmitter<ListArchivo[]> = new EventEmitter();
}
