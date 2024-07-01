import { Routes } from '@angular/router';
import { RegistroComponent } from './components/auth/registro/registro.component';
import { LoginComponent } from './components/auth/login/login.component';

export const routes: Routes = [
    {
        path: 'login', 
        component: LoginComponent
    },
    {
        path: '',
        component: RegistroComponent
    }
];
