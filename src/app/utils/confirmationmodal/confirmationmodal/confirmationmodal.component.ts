import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmationmodal',
  imports: [],
  templateUrl: './confirmationmodal.component.html',
  styleUrl: './confirmationmodal.component.css'
})
export class ConfirmationmodalComponent {
  @Input() customerId!: number; // Assurez-vous que l'ID est bien passé
  @Input() customerName: string = '';
  @Output() close = new EventEmitter<boolean>(); // Émission de l'événement de fermeture

  confirmDelete() {
    this.close.emit(true); // Retourne true si confirmé
  }

  cancel() {
    this.close.emit(false); // Retourne false si annulé
  }
}
