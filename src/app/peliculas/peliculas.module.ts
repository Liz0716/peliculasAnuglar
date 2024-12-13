import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeliculasRoutingModule } from './peliculas-routing.module';
import { AgregarComponent } from './agregar/agregar.component';
import { ListaComponent } from './lista/lista.component';
import { VerComponent } from './ver/ver.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PeliculasComponent } from './peliculas.component';


@NgModule({
  declarations: [
    AgregarComponent,
    ListaComponent,
    VerComponent,
    PeliculasComponent

  ],
  imports: [
    CommonModule,
    PeliculasRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule



  ]
})
export class PeliculasModule { }
