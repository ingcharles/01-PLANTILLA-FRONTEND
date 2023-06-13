import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path:'crca',
    loadChildren: ()=> import('../presentation/crca/crca.module').then( m => m.CrcaModule),
  },
  {
    path:'**',
    redirectTo:'home'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }