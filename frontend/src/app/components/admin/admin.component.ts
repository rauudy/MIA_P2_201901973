import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/autenticar.service';
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

  currentUser: any;
  usuarios: any[] = [];
  autoss: any[] = [];
  viajess: any[] = [];

  constructor(
    private http: UsuarioService,
    private router: Router,
    private authService: AuthService,
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  imagen: any = '';
  imagen_path: any = '';
  ruta_aws: any = '';

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
    nombreA: new FormControl('', Validators.required),
    marca: new FormControl('', Validators.required),
    placa: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    precioA: new FormControl('', Validators.required),
    ciudad: new FormControl('', Validators.required),
  });

  form_viajes = new FormGroup({
    nombreV: new FormControl('', Validators.required),
    ciudadO: new FormControl('', Validators.required),
    ciudadD: new FormControl('', Validators.required),
    dias: new FormControl('', Validators.required),
    precioV: new FormControl('', Validators.required),
  });

  registrar() {
    if (this.form_registro.valid) {
      if (this.form_registro.value.password === this.form_registro.value.confirm_password) {

        const index = this.imagen_path.indexOf(",");
        this.imagen_path = this.imagen_path.slice(index + 1);
        this.form_registro.value.imagen = this.imagen_path;
        this.form_registro.value.path = this.imagen.name;
        this.http.consult_post('/admin/registro', this.form_registro.value).subscribe({
          next: (data: any) => {
            if (data.status) {
              // debugger
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
            } else {
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
      } else {
        alert('Las contraseñas no coinciden');
        console.log('Las contraseñas no coinciden');
      }
    } else {
      alert('Formulario incompleto');
      console.log('Formulario incompleto');
    }
  }

  registrar_auto() {
    if (this.form_autos.valid) {
      // console.log('Formulario completo');
      this.http.consult_post('/admin/registro_auto', this.form_autos.value).subscribe({
        next: (data: any) => {
          if (data.status) {
            // debugger
            console.log('Auto registrado');
            Swal.fire({
              title: 'Auto registrado',
              text: 'Auto registrado correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
            this.form_autos.reset(); // Limpiar el formulario aquí
            // this.router.navigate(['/login']);
          } else {
            Swal.fire({
              title: 'Error al registrar Auto',
              text: 'Error al registrar Auto',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
            console.log('Error al registrar Auto');
          }
        },
        error: (error: any) => {
          console.log(error.errors[0]);
          Swal.fire({
            title: 'Error al registrar Auto',
            text: 'La base de datos no responde :c',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
          console.log('Error al registrar Auto');
        }
      });
    } else {
      alert('Formulario incompleto');
      console.log('Formulario incompleto');
    }
  }

  registrar_viaje() {
    if (this.form_viajes.valid) {
      // console.log('Formulario completo');
      this.http.consult_post('/admin/registro_viaje', this.form_viajes.value).subscribe({
        next: (data: any) => {
          if (data.status) {
            // debugger
            console.log('Viaje registrado');
            Swal.fire({
              title: 'Viaje registrado',
              text: 'Viaje registrado correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
            this.form_viajes.reset(); // Limpiar el formulario aquí
            // this.router.navigate(['/login']);
          } else {
            Swal.fire({
              title: 'Error al registrar Viaje',
              text: 'Error al registrar Viaje',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
            console.log('Error al registrar Viaje');
          }
        },
        error: (error: any) => {
          console.log(error.errors[0]);
          Swal.fire({
            title: 'Error al registrar Viaje',
            text: 'La base de datos no responde :c',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
          console.log('Error al registrar Viaje');
        }
      });
    } else {
      alert('Formulario incompleto');
      console.log('Formulario incompleto');
    }
  }

  onFileSelected(event: any) {
    // Seleccionar el archivo y convertirlo a base64
    this.imagen = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imagen_path = event.target.result;
    }
    reader.readAsDataURL(this.imagen);
  }

  encodeFileAsBase64(file: any) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('loadend', () => {
        resolve(reader.result);
      });
      reader.readAsDataURL(file);
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getUsuarios(){
    this.http.consult_get('/admin/getUsuarios').subscribe({
      next: (data: any) => {
        if(data.status){
          console.log('Usuarios tomados');
          // Swal.fire({
          //   title: 'Datos usuarios tomados',
          //   text: 'exito',
          //   icon: 'success',
          //   confirmButtonText: 'Aceptar'
          // });
          // console.log(data);
          this.usuarios = data.data;
          //this.router.navigate(['/login']);
        }else{
          Swal.fire({
            title: 'Error al error al recibir datos',
            text: 'Error',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
          console.log('Error al recibir datos');
        }
      },
      error: (error: any) => {
        console.log(error.errors[0]);
        Swal.fire({
          title: 'Error al recibir datos',
          text: 'La base de datos no responde :c',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        console.log('Error al recibir datos');
      }
    }
    );
  }

  getAutos(){
    this.http.consult_get('/admin/getAutos').subscribe({
      next: (data: any) => {
        if(data.status){
          console.log('Autos tomados');
          // Swal.fire({
          //   title: 'Datos usuarios tomados',
          //   text: 'exito',
          //   icon: 'success',
          //   confirmButtonText: 'Aceptar'
          // });
          // console.log(data);
          this.autoss = data.data;
          //this.router.navigate(['/login']);
        }else{
          Swal.fire({
            title: 'Error al error al recibir datos',
            text: 'Error',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
          console.log('Error al recibir datos');
        }
      },
      error: (error: any) => {
        console.log(error.errors[0]);
        Swal.fire({
          title: 'Error al recibir datos',
          text: 'La base de datos no responde :c',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        console.log('Error al recibir datos');
      }
    }
    );
  }

  getViajes(){
    this.http.consult_get('/admin/getViajes').subscribe({
      next: (data: any) => {
        if(data.status){
          console.log('Viajes tomados');
          // Swal.fire({
          //   title: 'Datos usuarios tomados',
          //   text: 'exito',
          //   icon: 'success',
          //   confirmButtonText: 'Aceptar'
          // });
          // console.log(data);
          this.viajess = data.data;
          //this.router.navigate(['/login']);
        }else{
          Swal.fire({
            title: 'Error al error al recibir datos',
            text: 'Error',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
          console.log('Error al recibir datos');
        }
      },
      error: (error: any) => {
        console.log(error.errors[0]);
        Swal.fire({
          title: 'Error al recibir datos',
          text: 'La base de datos no responde :c',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        console.log('Error al recibir datos');
      }
    }
    );
  }

  eliminarUsuario(_id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Estás seguro de que deseas eliminar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.http.consult_post('/admin/deleteUsuario', {id: _id}).subscribe({
          next: (data: any) => {
            if(data.status){
              console.log('Usuario eliminado');
              Swal.fire({
                title: 'Usuario eliminado',
                text: 'Usuario eliminado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
              this.getUsuarios();
            }else{
              Swal.fire({
                title: 'Error al error al eliminar usuario',
                text: 'Error',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
              console.log('Error al eliminar usuario');
            }
          },
          error: (error: any) => {
            console.log(error.errors[0]);
            Swal.fire({
              title: 'Error al eliminar usuario',
              text: 'Base de datos NO responde',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
            console.log('Error al eliminar usuario');
          }
        }
        );
      }
    });
  }

  eliminarAuto(_id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Estás seguro de que deseas eliminar este auto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.http.consult_post('/admin/deleteAuto', {id: _id}).subscribe({
          next: (data: any) => {
            if(data.status){
              console.log('Auto eliminado');
              Swal.fire({
                title: 'Auto eliminado',
                text: 'Auto eliminado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
              this.getAutos();
            }else{
              Swal.fire({
                title: 'Error al error al eliminar auto',
                text: 'Error',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
              console.log('Error al eliminar auto');
            }
          },
          error: (error: any) => {
            console.log(error.errors[0]);
            Swal.fire({
              title: 'Error al eliminar auto',
              text: 'Base de datos NO responde',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
            console.log('Error al eliminar auto');
          }
        }
        );
      }
    });
  }

  eliminarViaje(_id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Estás seguro de que deseas eliminar este viaje?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.http.consult_post('/admin/deleteViajes', {id: _id}).subscribe({
          next: (data: any) => {
            if(data.status){
              console.log('Viaje eliminado');
              Swal.fire({
                title: 'Viaje eliminado',
                text: 'Viaje eliminado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
              this.getViajes();
            }else{
              Swal.fire({
                title: 'Error al error al eliminar viaje',
                text: 'Error',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
              console.log('Error al eliminar viaje');
            }
          },
          error: (error: any) => {
            console.log(error.errors[0]);
            Swal.fire({
              title: 'Error al eliminar viaje',
              text: 'Base de datos NO responde',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
            console.log('Error al eliminar viaje');
          }
        }
        );
      }
    });
  }



}