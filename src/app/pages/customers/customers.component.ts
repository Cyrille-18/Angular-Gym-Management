import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../services/customerservice/customer.service';
import { CustomermodalComponent } from '../../utils/customermodal/customermodal.component';
import { ConfirmationmodalComponent } from '../../utils/confirmationmodal/confirmationmodal/confirmationmodal.component';

@Component({
  selector: 'app-customers',
  imports: [FormsModule, CommonModule, CustomermodalComponent,ConfirmationmodalComponent],
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
  selectedCustomerId: number = 0; // Attention : Assurez-vous que 0 n'est pas un ID valide.
  selectedCustomerName: string = '';

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
      this.filteredCustomers = [...this.customers]; // Réinitialisation
    } else {
      this.filteredCustomers = this.customers.filter(customer =>
        customer.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        customer.lastName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  
  }
  
  
  

  addCustomer(): void {
  }

  editCustomer(id: number): void {
    
    const customerToEdit = this.customers.find(c => c.userId === id);
    
    if (customerToEdit) {
      this.selectedCustomer = { ...customerToEdit };
      this.isModalOpen = true;
    } else {
      console.error("Client avec l'ID " + id + " non trouvé.");
    }
  }
  
  
  // Ouvrir le modal de confirmation avec l'ID du client
  deleteCustomer(id: number, firstName: string, lastName: string): void {
    this.selectedCustomerId = id;
    this.selectedCustomerName = `${firstName} ${lastName}`; //Stocke le nom et prénom
    this.isConfirmationModalOpen = true;
  }
  

   // Gérer la confirmation ou l'annulation dans le modal
   handleConfirmation(confirmed: boolean): void {
    if (confirmed && this.selectedCustomerId !== null && this.selectedCustomerName) {
      this.customerService.deleteCustomer(this.selectedCustomerId).subscribe({
        next: (response) => {
          this.getCustomers(); // Recharge la liste des clients après suppression
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
    this.selectedCustomer = { lastName: '', firstName: '', phoneNumber: '', registrationDate: '' }; // Réinitialisation
    this.isModalOpen = true;
  }
  
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedCustomer = null;  // Réinitialiser les données
  }

  testClick(): void {
  }
}
