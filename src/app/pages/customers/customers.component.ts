import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../services/customerservice/customer.service';
import { CustomermodalComponent } from '../../utils/customermodal/customermodal.component';
import { ConfirmationmodalComponent } from '../../utils/confirmationmodal/confirmationmodal/confirmationmodal.component';
import { CustomerResponseModalComponentComponent } from '../../utils/customeresponsemodal/customer-response-modal-component/customer-response-modal-component.component';  

@Component({
  selector: 'app-customers',
  imports: [FormsModule, CommonModule, CustomermodalComponent, ConfirmationmodalComponent, CustomerResponseModalComponentComponent],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: any[] = [];
  filteredCustomers: any[] = [];
  searchTerm: string = '';
  selectedCustomer: any = null;
  isModalOpen = false;
  isConfirmationModalOpen = false;
  selectedCustomerId: number = 0;
  selectedCustomerName: string = '';
  showResponseModal: boolean = false;
  customerResponse: any = null;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data;
        this.filteredCustomers = [...this.customers];
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des clients:', error);
      }
    });
  }

  filterCustomers(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredCustomers = [...this.customers];
    } else {
      this.filteredCustomers = this.customers.filter(customer =>
        customer.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        customer.lastName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  addCustomer(): void {}

  editCustomer(id: number): void {
    const customerToEdit = this.customers.find(c => c.userId === id);
    if (customerToEdit) {
      this.selectedCustomer = { ...customerToEdit };
      this.isModalOpen = true;
    } else {
      console.error("Client avec l'ID " + id + " non trouvé.");
    }
  }

  deleteCustomer(id: number, firstName: string, lastName: string): void {
    this.selectedCustomerId = id;
    this.selectedCustomerName = `${firstName} ${lastName}`;
    this.isConfirmationModalOpen = true;
  }

  handleConfirmation(confirmed: boolean): void {
    if (confirmed && this.selectedCustomerId !== null && this.selectedCustomerName) {
      this.customerService.deleteCustomer(this.selectedCustomerId).subscribe({
        next: (response) => {
          this.getCustomers();
          this.isConfirmationModalOpen = false;
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du client:', error);
        }
      });
    } else {
      this.isConfirmationModalOpen = false;
    }
  }

  openModal(): void {
    this.selectedCustomer = { lastName: '', firstName: '', phoneNumber: '', registrationDate: '' };
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedCustomer = null;
    this.getCustomers();
  }

  handleSaveCustomer(response: any): void {
    this.customerResponse = response;

    // Vérification si c'est un ajout ou une modification
    if (response && !response.userId) {
      // Si il n'y a pas de userId, c'est un ajout
      this.showResponseModal = true;
    } else {
      // Si il y a un userId, c'est une modification
      this.showResponseModal = false;
    }
  
    // Fermer le modal
    this.closeModal();
  }
}
