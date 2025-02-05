import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from '../pages/customers/customers.component';
import { HomeComponent } from '../pages/home/home.component';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, CustomersComponent, HomeComponent, RouterModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  isSidebarOpen = true;
  activePage = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Écoute les changements de navigation et met à jour activePage
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activePage = event.urlAfterRedirects;
      }
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  shouldShowLayout(): boolean {
    return this.router.url !== '/'; // Cache le layout sur la page de login
  }
}
