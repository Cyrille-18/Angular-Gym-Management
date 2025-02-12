import { Component, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../services/customerservice/customer.service';  // Assurez-vous d'importer le service

@Component({
  selector: 'app-customermodal',
  imports: [FormsModule, CommonModule],
  templateUrl: './customermodal.component.html',
  styleUrls: ['./customermodal.component.css']
})
export class CustomermodalComponent implements OnChanges {
  @Input() customer: any = { 
    lastName: '', 
    firstName: '', 
    phoneNumber: '', 
    registrationDate: "" 
  }; // Données du client à modifier
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();  // Pour émettre les données après modification

  modalTitle: string = 'Ajouter un Client';
  buttonText: string = 'Ajouter un Client';

  constructor(private customerService: CustomerService) {}  // Injection du service

  ngOnChanges(): void {
    if (this.customer && this.customer.lastName) {
      // Si le client a des données, on change le titre et le texte du bouton
      this.modalTitle = 'Modifier un Client';
      this.buttonText = 'Modifier le Client';
    } else {
      this.modalTitle = 'Ajouter un Client';
      this.buttonText = 'Ajouter un Client';
    }
  }

  // Ajouter ou modifier un client
  saveCustomer(): void {
    const updatedCustomer = {
      lastName: this.customer.lastName,
      firstName: this.customer.firstName,
      phoneNumber: this.customer.phoneNumber,
      registrationDate: this.customer.registrationDate
    };

    if (this.customer.userId) {
      // Si un client est déjà sélectionné, on modifie
      this.customerService.updateCustomer(this.customer.userId, updatedCustomer).subscribe({
        next: (response) => {
          this.save.emit(updatedCustomer);
          this.closeModal();
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du client:', error);
        }
      });
    } 
  }

  closeModal(): void {
    this.close.emit();
  }
  
}
