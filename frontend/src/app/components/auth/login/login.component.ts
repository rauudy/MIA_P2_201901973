import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../../services/autenticar.service';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';
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
    private authService: AuthService) {  }
  
    loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  login() {
    if(this.loginForm.valid){
      //const { usuario, password } = this.loginForm.value;
      const usuario = '' + this.loginForm.value.username;
      const password = '' + this.loginForm.value.password;
      console.log("Usuario: "+usuario );
      this.authService.login(usuario, password).subscribe(
        response => {
          alert('Acceso Correcto');
          // Handle successful login, e.g., store user data, navigate to dashboard, etc.
        },
        error => {
          console.error('Acceso Incorrecto', error);
          // Handle login failure, e.g., show error message
        }
      );
    }else{
      alert('Formulario incompleto');
      console.log('Formulario incompleto');
    }
  }
}