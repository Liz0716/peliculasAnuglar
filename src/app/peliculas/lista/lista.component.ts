import { Component } from '@angular/core';
import { Pelicula } from '../interface/pelicula.interface';
import { peliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  pelicula: Pelicula[] = [];

  constructor(public peliculaService: peliculasService){
    this.obtenerPeliculas();
  }

  obtenerPeliculas(){
    this.peliculaService.Service_Get('peliculas').subscribe(
      (data: any) => {
        if (data.estatus) {
          this.pelicula = data.data;
          console.log(data.data);


        }else{
          console.log('Error al obtener las peliculas',data.mensaje);
        }
      }
    )
  }

}
