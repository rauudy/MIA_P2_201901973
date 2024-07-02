import { Routes } from '@angular/router';
import { RegistroComponent } from './components/auth/registro/registro.component';
import { LoginComponent } from './components/auth/login/login.component'; // Importa el componente de login
import { AdminComponent } from './components/admin/admin.component';
import { RecepcionistaComponent } from './components/recepcionista/recepcionista.component';
import { TuristaComponent } from './components/turista/turista.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'recepcionista',
    component: RecepcionistaComponent
  },
  {
    path: 'turista',
    component: TuristaComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];
