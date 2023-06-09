import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { CreateComponent } from './pages/create/create.component';


const routes: Routes = [{
  path: '', component: IndexComponent
},
{
  /* Ruta para la */
  path: 'create', component: CreateComponent
},
{
  path: 'edit/:id',
  component: CreateComponent
},
// {
//   path: 'ejemplo', component: CRUDComponent
// },
{
  path: '**',
  redirectTo: '',
}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 