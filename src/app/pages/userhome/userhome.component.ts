import { Component, OnInit } from '@angular/core';
import { SubscriptionsService } from '../../services/subscriptionservice/subscriptions.service'; // Assurez-vous que le chemin est correct
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/authservice/auth.service'; // Assurez-vous que le chemin est correct
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-userhome',
  imports: [CommonModule],
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css'],
})
export class UserhomeComponent implements OnInit {
  currentSubscription: any = null;

  constructor(
    private subscriptionsService: SubscriptionsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCurrentSubscription();
  }

  // Récupère la souscription actuelle
  getCurrentSubscription(): void {
    this.subscriptionsService.getCurrentSubscription().subscribe(
      (subscription) => {
        this.currentSubscription = subscription;
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération de la souscription',
          error
        );
      }
    );
  }

  calculateRemainingTime(startDate: string, durationMonths: number): string {
    const start = new Date(startDate);
    const end = new Date(start);
    end.setMonth(start.getMonth() + durationMonths);

    const remainingTime = end.getTime() - Date.now();
    const daysRemaining = Math.floor(remainingTime / (1000 * 3600 * 24));

    return `${daysRemaining} jours`;
  }

  showTab(tabId: string, event: Event): void {
    document.querySelectorAll<HTMLElement>('.tab').forEach((tab) => {
      tab.classList.remove('active');
    });

    const tabElement = document.getElementById(tabId);
    if (tabElement) {
      tabElement.classList.add('active');
    }

    document.querySelectorAll<HTMLElement>('.menu a').forEach((link) => {
      link.classList.remove('active');
    });

    const target = event.target as HTMLElement;
    if (target) {
      target.classList.add('active');
    }
  }

  onLogout() {
    this.authService.logout(); // Appelle la fonction logout du service
    this.router.navigate(['']); // Redirige vers la page de connexion
  }
}
