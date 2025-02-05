import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomermodalComponent } from '../../utils/customermodal/customermodal.component';
@Component({
  selector: 'app-customers',
  imports: [FormsModule, CommonModule, CustomermodalComponent],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {
  customers = [
    { 
      id: 1, 
      nom: 'Doe', 
      prenom: 'John', 
      dateInscription: '2024-01-15', 
      abonnementActif: true 
    },
    { 
      id: 2, 
      nom: 'Smith', 
      prenom: 'Jane', 
      dateInscription: '2024-02-10', 
      abonnementActif: false 
    },
    { 
      id: 3, 
      nom: 'Brown', 
      prenom: 'Charlie', 
      dateInscription: '2024-03-05', 
      abonnementActif: true 
    }
  ];

  filteredCustomers = [...this.customers];
  searchTerm: string = '';

  ngOnInit(): void {}

  filterCustomers() {
    this.filteredCustomers = this.customers.filter(customer =>
      customer.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      customer.prenom.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  addCustomer() {
    // Logique pour ajouter un client
  }

  editCustomer(id: number) {
    // Logique pour modifier un client
  }

  deleteCustomer(id: number) {
    this.customers = this.customers.filter(customer => customer.id !== id);
    this.filterCustomers(); // Mettre à jour le tableau filtré
  }

  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
    console.log('Modal ouvert:', this.isModalOpen);
  }
  
  closeModal() {
    this.isModalOpen = false;
  }
  testClick() {
    console.log("Bouton cliqué !");
  }
  
}
