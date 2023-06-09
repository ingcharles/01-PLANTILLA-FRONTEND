import { CrcaMapper } from './../../../../data/crca/mappers/crca.mapper';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrcaAllViewModel } from 'src/domain/crca/viewModels/crca-all.viewModel';
import { CrcaIndexDataGridInterface } from '../../interfaces/crca-index-data-grid.interface';
import { GetCrcaUseCase } from 'src/domain/crca/usecases/get-crca.usecase';
import { map } from 'rxjs';

@Component({
  providers: [CrcaMapper],
  selector: 'index-crca',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  // private activateRouter: ActivatedRoute;
  public headers!:CrcaIndexDataGridInterface[];
  public allCrca: CrcaAllViewModel[] = [];
  public contabilidad: any = {codigoContabiliad:1};
  constructor(private _getCrcaUseCase: GetCrcaUseCase , private _crcaMapper:CrcaMapper, private router: Router) { }
  ngOnInit(): void {
    this._getCrcaUseCase.getCrcaAll(this.contabilidad).pipe(  map ( data => this._crcaMapper.mapCrcaAllFrom (data))
    ). subscribe(
      result => {
        if(result){
          this.allCrca = result;
          this.headers=[
            {name:'codigoCrca',aligment:'center',visible:true,width:'10%',caption:'Cod'},
            {name:'dniAportante',aligment:'center',visible:true,width:'10%',caption:'Cédula'},
            {name:'nombreAportante',aligment:'center',visible:true,width:'30%',caption:'Aportante'},
            {name:'detalleAporteEspecie',aligment:'center',visible:true,width:'30%',caption:'Detalle'},
            {name:'valorNumero',aligment:'center',visible:true,width:'15%',caption:'Valor',format:'$,###,###,##0.00'},
          ]
        }
      }
    );
  }
  numerario(){
    this.router.navigateByUrl('crca/create');
  }
  especie(){
    this.router.navigateByUrl('create');
  }
  onloades(){
    console.log("entro al seleccionar");
  }
  editarCrca(id:string | number){
    this.router.navigateByUrl(`crca/edit/${btoa(id.toString())}`);
  }
}
