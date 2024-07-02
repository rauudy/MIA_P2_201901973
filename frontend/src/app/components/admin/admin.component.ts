import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

  constructor(
    private http: UsuarioService,
    private router: Router
  ){}

  imagen: any = '';
  imagen_path: any = '';
  ruta_aws:any = '';

  form_registro = new FormGroup({
    path: new FormControl(''),
    imagen: new FormControl(''),
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    usuario: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirm_password: new FormControl('', Validators.required),
    tipoUsuario: new FormControl('', Validators.required),
  });

  form_autos = new FormGroup({
    nombre: new FormControl('', Validators.required),
    marca: new FormControl('', Validators.required),
    placa: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    ciudad: new FormControl('', Validators.required),
  });
  
  form_viajes = new FormGroup({
    nombre: new FormControl('', Validators.required),
    ciudadO: new FormControl('', Validators.required),
    ciudadD: new FormControl('', Validators.required),
    dias: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
  });

  registrar(){
    if(this.form_registro.valid){
      if(this.form_registro.value.password === this.form_registro.value.confirm_password){
        
        const index = this.imagen_path.indexOf(",");
        this.imagen_path = this.imagen_path.slice(index + 1);
        this.form_registro.value.imagen = this.imagen_path;
        this.form_registro.value.path = this.imagen.name;
        this.http.consult_post('/admin/registro', this.form_registro.value).subscribe({
          next: (data: any) => {
            if(data.status){
              debugger
              console.log('Usuario registrado');
              console.log(data.image)
              this.ruta_aws = data.image;
              Swal.fire({
                title: 'Usuario registrado',
                text: 'Usuario registrado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
              this.form_registro.reset(); // Limpiar el formulario aquí
              // this.router.navigate(['/login']);
            }else{
              Swal.fire({
                title: 'Error al registrar usuario',
                text: 'Error al registrar usuario',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
              console.log('Error al registrar usuario');
            }
          },
          error: (error: any) => {
            console.log(error.errors[0]);
            Swal.fire({
              title: 'Error al registrar usuario',
              text: 'La base de datos no responde :c',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
            console.log('Error al registrar usuario');
          }
        }
        );
      }else{
        alert('Las contraseñas no coinciden');
        console.log('Las contraseñas no coinciden');
      }
    }else{
      alert('Formulario incompleto');
      console.log('Formulario incompleto');
    }
  }

  registrar_auto(){
    if(this.form_autos.valid){
      console.log('Formulario completo');
    }else{
      alert('Formulario incompleto');
      console.log('Formulario incompleto');
    }
  }
  
  registrar_viaje(){
    if(this.form_autos.valid){
      console.log('Formulario completo');
    }else{
      alert('Formulario incompleto');
      console.log('Formulario incompleto');
    }
  }

  onFileSelected(event: any){
    // Seleccionar el archivo y convertirlo a base64
    this.imagen = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event:any) => {
      this.imagen_path = event.target.result;
    }
    reader.readAsDataURL(this.imagen);
  }

  encodeFileAsBase64(file:any){
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('loadend', () =>{
        resolve(reader.result);
      });
      reader.readAsDataURL(file);
    });
  }

}