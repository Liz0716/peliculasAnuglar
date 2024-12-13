import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarComponent } from './agregar/agregar.component';
import { ListaComponent } from './lista/lista.component';
import { VerComponent } from './ver/ver.component';
import { PeliculasComponent } from './peliculas.component';

const routes: Routes = [
  {path: '', component: PeliculasComponent, children:[
    {path: 'agregar', component: AgregarComponent},
    {path: 'lista', component: ListaComponent},
    {path: 'ver/:id', component: VerComponent},
    {path: 'actualizar/:id', component: AgregarComponent},
    {path: '', redirectTo: 'lista', pathMatch: 'full'}
  ]},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeliculasRoutingModule { }
