import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    // Routes sans layout
    {
        path: '',
        component: LoginComponent,
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    // Routes avec layout
    
    // Redirection  en cas de routes inconnues
    {
        path: '**',
        component: LoginComponent
    }
];
