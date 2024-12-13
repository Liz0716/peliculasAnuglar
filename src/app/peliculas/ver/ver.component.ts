import { Component } from '@angular/core';
import { Pelicula } from '../interface/pelicula.interface';
import { peliculasService } from '../../services/peliculas.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrl: './ver.component.css'
})
export class VerComponent {
  ID = 0;
  pelicula: Pelicula | undefined;

  constructor(public peliculaService: peliculasService, public router: Router, private activateRoute: ActivatedRoute) {
    this.activateRoute.params.subscribe(params => {
      if (!params['id']) {
        return;
      }
      this.ID = params['id'];
      this.peliculaService.Service_Get('peliculas/'+params['id'],'').subscribe((response: any) => {
        console.log(response);

        this.pelicula = response.data;
        if (this.pelicula == undefined) {
          Swal.fire({
            title: "No se encuentra la pelicula",
            icon: "warning"
          });
          this.router.navigate(['/peliculas/lista']);
        }
      });
    })


  }

  eliminarPelicula() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: '¿Seguro que deseas eliminar?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.peliculaService.Service_Delete('peliculas', this.ID).subscribe(
          (data: any) => {
            if (data.estatus) {
              swalWithBootstrapButtons.fire({
                title: 'Eliminado!',
                text: 'La película ha sido eliminada correctamente.',
                icon: 'success'
              });
              this.router.navigate(['/peliculas/lista']);
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              swalWithBootstrapButtons.fire({
                title: "Cancelado",
                icon: "error"
              });
            }
          });
      }
    })
  }
}


