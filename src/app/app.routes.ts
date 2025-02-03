import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    // Routes sans layout
    {
        path: '',
        component: LoginComponent,
    },
    // Routes avec layout
    
    // Redirection  en cas de routes inconnues
    {
        path: '**',
        component: LoginComponent
    }
];
