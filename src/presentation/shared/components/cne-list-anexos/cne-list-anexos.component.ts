import { Component, Input } from '@angular/core';

@Component({
  selector: 'cne-list-anexos',
  templateUrl: './cne-list-anexos.component.html',
  styleUrls: ['./cne-list-anexos.component.css']
})
export class CneListAnexosComponent {
  @Input()
  public datasource: {name:string,description:string,file:File}[] = [];
  Delete(index: number) {
    this.datasource.splice(index, 1);
  }

}
