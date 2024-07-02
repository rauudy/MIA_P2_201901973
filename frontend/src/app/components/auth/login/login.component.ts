import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../../services/autenticar.service';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // Verifica que esta ruta sea correcta y que el archivo exista
})
export class LoginComponent {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
    ) { }

  form_login = new FormGroup({
    usuario: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  login() {
    if (this.form_login.valid) {
      const usuario = '' + this.form_login.value.usuario;
      const password = '' + this.form_login.value.password;
      console.log("Usuario: " + usuario);
      console.log("Pass: " + password);
      debugger
      this.authService.login(usuario, password).subscribe(
        response => {
          Swal.fire({
            title: 'Acceso correcto',
            text: 'Has iniciado sesión correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });

          if (response.tipoUsuario == 'admin') {
            this.router.navigate(['/admin']);
          }else if (response.tipoUsuario == 'turista') {
            this.router.navigate(['/turista']);
          }else if (response.tipoUsuario == 'recepcionista') {
            this.router.navigate(['/recepcionista']);
          }
          // Handle successful login, e.g., store user data, navigate to dashboard, etc.
        },
        error => {
          Swal.fire({
            title: 'Acceso incorrecto',
            text: 'Usuario o contraseña incorrectos',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
          // Handle login failure, e.g., show error message
        }
      );
    } else {
      Swal.fire({
        title: 'Formulario incompleto',
        text: 'Por favor, completa todos los campos',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}