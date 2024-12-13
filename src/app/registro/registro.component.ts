import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../usuarios.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  Formulario: FormGroup = this.formBuilder.group({
    nombre: ['', Validators.required],
    apellido_paterno: ['', Validators.required],
    apellido_materno: [''],
    telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    fecha_nacimiento: ['',Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],

  })

  constructor(private router: Router,
    public formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
    public usuarioService: UserService) {

  }

  registro() {
    if (this.Formulario.invalid) {
      this.showError('Por favor, llena todos los campos correctamente.');
      return;
    }

    const usuario = this.Formulario.value;

    this.usuarioService.registroUsuario(usuario).subscribe
      ({
        next: (response: any) => {
          this.showSuccess('Registro Exitoso, ' + response.msg.nombre);
          this.router.navigate(['/login']);
        },
        error: (error: any) => {
          this.showError('Hubo un error: ' + error.msg);
        }
      })
  }
  private showError(message: string) {
    alert(message);
  }

  private showSuccess(message: string) {
    alert(message);
  }

  get f() {
    return this.Formulario.controls;
  }

}
