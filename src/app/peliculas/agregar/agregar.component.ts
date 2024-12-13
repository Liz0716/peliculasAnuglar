import { Component } from '@angular/core';
import { Pelicula } from '../interface/pelicula.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { peliculasService } from '../../services/peliculas.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrl: './agregar.component.css'
})
export class AgregarComponent {

  ID = 0;
  Pelicula: Pelicula | undefined;
  generos : any;

  Formulario: FormGroup = this.formBuilder.group({
    id: [''],
    nombre: ['', [Validators.required]],
    director: ['', [Validators.required]],
    anio_publicacion: ['', [Validators.required]],
    id_genero: ['', [Validators.required]],
    id_user: [JSON.parse(localStorage.getItem('infoUser')|| '{}').nombre]
  });

  constructor(private activateRoute: ActivatedRoute, public peliculaService: peliculasService
    , public router: Router, public formBuilder: FormBuilder) {

      this.peliculaService.Service_Get('genero','').subscribe((response: any) => {
        this.generos = response.data
      })

    this.activateRoute.params.subscribe(params => {
      if (!params['id']) {
        return;
      }
      this.ID = params['id'];
      this.peliculaService.Service_Get('peliculas/'+params['id'],'').subscribe((response: any) => {
        this.Formulario.reset(this.Pelicula);
        console.log(response);
        this.Pelicula = response.data;
        this.Formulario.patchValue(this.Pelicula as any)

        if (this.Pelicula == undefined) {
          Swal.fire({
            title: "No se encuentra la pelicula",
            icon: "warning"
          });
          this.router.navigate(['/peliculas/lista']);
        }
      });
    })

  }

  onSubmit(){
    console.log("holis");
    if (this.Formulario.invalid) {
      this.Formulario.markAllAsTouched();
      return;
    }
    console.log(this.Formulario.value);
    if (this.Formulario.value?.id == '') {
      console.log("holis2");
      this.peliculaService.Service_Post('peliculas','',this.Formulario.value).subscribe((response: any) => {
        console.log(response);

        if (response.estatus) {
          Swal.fire({
            title: "Pelicula agregada",
            icon: "success"
          });
          this.router.navigate(['peliculas/lista']);
        } else {
          Swal.fire({
            title: "Error al agregar la película",
            icon: "error"
          });
        }
      });
    } else {
      this.peliculaService.Service_Patch('peliculas',this.ID,this.Formulario.value).subscribe((response: any) => {
        if (response.estatus) {
          Swal.fire({
            title: "Pelicula actualizada",
            icon: "success"
          });
          this.router.navigate(['/peliculas/lista']);
        } else {
          Swal.fire({
            title: "Error al actualizar la pelicula",
            icon: "error"
          });
        }
      });

    }
  }

  get f() {
    return this.Formulario.controls;
  }








}
