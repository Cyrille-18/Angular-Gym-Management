import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from "./layout/layout.component";
import { HomeComponent } from "./pages/home/home.component";
import { CustomersComponent } from './pages/customers/customers.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LayoutComponent, HomeComponent,CustomersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GymManagement';
}
