import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrl: './peliculas.component.css'
})
export class PeliculasComponent {

  constructor(private router: Router){

  }

  salir(){
    localStorage.clear();
    this.router.navigate(['login'])
  }

}
