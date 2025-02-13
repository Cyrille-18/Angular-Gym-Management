import { Component, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../services/customerservice/customer.service';

@Component({
  selector: 'app-customermodal',
  imports: [FormsModule, CommonModule],
  templateUrl: './customermodal.component.html',
  styleUrls: ['./customermodal.component.css']
})
export class CustomermodalComponent implements OnChanges {
  @Input() customer: any = { lastName: '', firstName: '', phoneNumber: '', registrationDate: '' };
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  modalTitle: string = 'Ajouter un Client';
  buttonText: string = 'Ajouter un Client';

  constructor(private customerService: CustomerService) {}

  ngOnChanges(): void {
    if (this.customer && this.customer.userId) {
      this.modalTitle = 'Modifier un Client';
      this.buttonText = 'Modifier le Client';
    } else {
      this.modalTitle = 'Ajouter un Client';
      this.buttonText = 'Ajouter un Client';
    }
  }

  saveCustomer(): void {
    const customerData = {
      lastName: this.customer.lastName,
      firstName: this.customer.firstName,
      phoneNumber: this.customer.phoneNumber,
      registrationDate: this.customer.registrationDate
    };

    if (this.customer.userId) {
      this.customerService.updateCustomer(this.customer.userId, customerData).subscribe({
        next: (response) => {
          this.save.emit(response);
          this.closeModal();
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du client:', error);
        }
      });
    } else {
      this.customerService.addCustomer(customerData).subscribe({
        next: (response) => {
          this.save.emit(response);
          this.closeModal();
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout du client:', error);
        }
      });
    }
  }

  closeModal(): void {
    this.close.emit();
  }
}
