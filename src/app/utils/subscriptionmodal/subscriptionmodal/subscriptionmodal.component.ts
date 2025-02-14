import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../../services/customerservice/customer.service';
import { PackserviceService } from '../../../services/packservice/packservice.service';
import { SubscriptionsService } from '../../../services/subscriptionservice/subscriptions.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subscription-modal',
  imports: [FormsModule, CommonModule],
  templateUrl: './subscriptionmodal.component.html',
  styleUrls: ['./subscriptionmodal.component.css'],
})
export class SubscriptionModalComponent implements OnInit {
  modalTitle: string = 'Nouvelle Souscription';
  buttonText: string = 'Souscrire';

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  clients: any[] = [];
  offers: any[] = [];

  subscription = {
    customerId: null,
    packId: null,
    subscriptionDate: new Date().toISOString().split('T')[0],
  };

  constructor(
    private customerService: CustomerService,
    private packService: PackserviceService,
    private subscriptionsService: SubscriptionsService
  ) {}

  ngOnInit(): void {
    this.loadClients();
    this.loadOffers();
  }

  loadClients(): void {
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        console.log('Clients récupérés :', data);
        this.clients = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des clients', err);
      },
    });
  }

  loadOffers(): void {
    this.packService.getPacks().subscribe({
      next: (data) => {
        console.log('Offres récupérées :', data);
        this.offers = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des packs', err);
      },
    });
  }

  closeModal(): void {
    this.close.emit();
  }

  saveSubscription(): void {
    if (!this.subscription.customerId || !this.subscription.packId) {
      alert('Veuillez sélectionner un client et une offre.');
      return;
    }

    this.subscriptionsService
      .addSubscription(this.subscription)
      .subscribe((response) => {
        this.save.emit(response);
        this.closeModal();
      });
  }
}
