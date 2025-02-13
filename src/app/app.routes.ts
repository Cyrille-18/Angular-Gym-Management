import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { LayoutComponent } from './layout/layout.component';
import { PacksComponent } from './pages/packs/packs/packs.component';

export const routes: Routes = [
    // Route sans layout (Page de connexion)
    {
        path: '',
        component: LoginComponent,
    },

    // Routes avec layout (Dashboard)
    {
        path: 'app',  // On change le préfixe pour éviter les conflits
        component: LayoutComponent,
        children: [
            { path: 'Accueil', component: HomeComponent },
            { path: 'Client', component: CustomersComponent },
            {path:'Offres', component: PacksComponent}
        ]
    },

    // Redirection pour toutes les routes inconnues
    {
        path: '**',
        redirectTo: ''
    }
];
