// home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackserviceService } from '../../services/packservice/packservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  offers: any[] = [];

  constructor(private packService: PackserviceService) {}

  ngOnInit(): void {
    this.packService.getPacks().subscribe((packs) => {
      this.offers = packs;
    });
  }
  newClients = [
    { name: 'Jean Dupont', date: '2024-02-01', plan: 'Premium' },
    { name: 'Marie Martin', date: '2024-02-02', plan: 'Basic' },
    { name: 'Pierre Durant', date: '2024-02-03', plan: 'Pro' },
  ];
}
