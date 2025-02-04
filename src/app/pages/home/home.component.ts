// home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  offers = [
    { name: 'Basic', price: '19.99€', features: ['Accès basique', 'Horaires standards'] },
    { name: 'Premium', price: '29.99€', features: ['Accès illimité', '24/7', 'Coach virtuel'] },
    { name: 'Pro', price: '39.99€', features: ['Tout inclus', 'Coach personnel', 'Cours collectifs'] },
  ];

  newClients = [
    { name: 'Jean Dupont', date: '2024-02-01', plan: 'Premium' },
    { name: 'Marie Martin', date: '2024-02-02', plan: 'Basic' },
    { name: 'Pierre Durant', date: '2024-02-03', plan: 'Pro' },
  ];
}