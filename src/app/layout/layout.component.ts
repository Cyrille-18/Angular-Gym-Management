import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from '../pages/customers/customers.component';
import { HomeComponent } from '../pages/home/home.component';
import { AuthService } from '../services/authservice/auth.service';
import { PacksComponent } from "../pages/packs/packs/packs.component";

@Component({
  selector: 'app-layout',
  imports: [CommonModule, CustomersComponent, HomeComponent, RouterModule, PacksComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  isSidebarOpen = true;
  activePage = '';
  username = "";
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activePage = event.urlAfterRedirects;
      }
    });
  
      // Force le rechargement du username au démarrage
    this.authService.decodeToken();
    // Met à jour le username en écoutant les changements
    this.authService.getUsernameObservable().subscribe(name => {
      this.username = name || 'Invité';
      console.log('Nom d’utilisateur mis à jour:', this.username);
    });
  }
  
  

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  shouldShowLayout(): boolean {
    return this.router.url !== '/';
  }
  
  onLogout() {
    this.authService.logout();  // Appelle la fonction logout du service
    this.router.navigate(['']);  // Redirige vers la page de connexion
  }
}
