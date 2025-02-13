import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-response-modal-component',
  imports: [CommonModule],
  templateUrl: './customer-response-modal-component.component.html',
  styleUrls: ['./customer-response-modal-component.component.css']
})
export class CustomerResponseModalComponentComponent {
  @Input() customerResponse: any;
  @Output() close = new EventEmitter<void>();

  ngOnInit() {
  }

  closeModal(): void {
    this.close.emit();
  }
}
