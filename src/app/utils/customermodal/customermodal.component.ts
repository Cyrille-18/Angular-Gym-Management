import { Component,EventEmitter,Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customermodal',
  imports: [FormsModule, CommonModule],
  templateUrl: './customermodal.component.html',
  styleUrl: './customermodal.component.css'
})
export class CustomermodalComponent {
  @Output() close = new EventEmitter<void>();

  customer = { nom: '', prenom: '', dateInscription: '' };

  addCustomer() {
    console.log('Client ajouté:', this.customer);
    this.close.emit(); // Ferme le modal après ajout
  }

  closeModal() {
    this.close.emit();
  }
}
