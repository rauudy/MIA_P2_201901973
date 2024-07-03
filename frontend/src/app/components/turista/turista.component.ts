import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/autenticar.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-turista',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './turista.component.html',
  styleUrl: './turista.component.scss'
})
export class TuristaComponent {

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
    this.getAutos();
    this.getViajes();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


  getAutos(){
    this.http.consult_get('/admin/getAutos').subscribe({
      next: (data: any) => {
        if(data.status){
          console.log('Autos tomados');
          this.autoss = data.data;
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
          this.viajess = data.data;
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