import { Component } from '@angular/core';
import { SubscriptionsService } from '../../../services/subscriptionservice/subscriptions.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SubscriptionModalComponent } from '../../../utils/subscriptionmodal/subscriptionmodal/subscriptionmodal.component';

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [FormsModule, CommonModule, SubscriptionModalComponent],
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.css',
})
export class SubscriptionsComponent {
  subscriptions: any[] = [];
  filteredsubscriptions: any[] = [];
  searchTerm: string = '';
  isModalOpen = false;
  selectedCustomer: any = null;

  constructor(private subscriptionService: SubscriptionsService) {}

  ngOnInit(): void {
    this.getSubscriptions();
  }

  getSubscriptions(): void {
    this.subscriptionService.getSubscriptions().subscribe({
      next: (data) => {
        this.subscriptions = data;
        this.filteredsubscriptions = [...this.subscriptions];
      },
      error: (error) => {
        console.error(
          'Erreur lors de la récupération des souscriptions:',
          error
        );
      },
    });
  }

  filterCustomers(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredsubscriptions = [...this.subscriptions];
    } else {
      this.filteredsubscriptions = this.subscriptions.filter(
        (subscription) =>
          subscription.customer.lastName
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          subscription.customer.firstName
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
      );
    }
  }

  getEndDate(startDate: string, durationMonths: number): Date {
    let start = new Date(startDate);
    let endDate = new Date(start.setMonth(start.getMonth() + durationMonths));
    return endDate;
  }

  getSubscriptionStatus(startDate: string, durationMonths: number): string {
    let endDate = this.getEndDate(startDate, durationMonths);
    return new Date() < endDate ? 'Actif' : 'Inactif';
  }

  getStatusClass(startDate: string, durationMonths: number): string {
    let endDate = this.getEndDate(startDate, durationMonths);
    return new Date() < endDate ? 'active-status' : 'inactive-status';
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  handleSaveCustomer(subscription: any): void {
    this.subscriptions.push(subscription);
    this.filteredsubscriptions = [...this.subscriptions];
    this.closeModal();
  }
}
