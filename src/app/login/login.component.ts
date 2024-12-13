import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../usuarios.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  Formulario: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],

  })

  constructor(private router: Router,
    public formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
    public usuarioService: UserService) {

  }

  login() {
    if (this.Formulario.invalid) {
      this.showError('Por favor, llena todos los campos correctamente.');
      return;
    }

    const usuario = this.Formulario.value;

    this.usuarioService.loginUsuario(usuario).subscribe(
      response => {
        Swal.fire({
          title: 'Bienvenido, ' + response.msg.nombre,
          icon: "success"
        })
        this.router.navigate(['/peliculas']);
        localStorage.setItem('infoUser',JSON.stringify(response.msg));
      },
      error => {
        this.showError('Hubo un error: ' + error.msg);
      }
    );
  }

  private showError(message: string) {
    alert(message);
  }

  private showSuccess(message: string) {
    alert(message);
  }

  registro(){
    this.router.navigate(['/registro']);
  }



}
