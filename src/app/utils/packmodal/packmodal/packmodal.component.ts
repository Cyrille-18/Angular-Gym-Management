import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PackserviceService } from '../../../services/packservice/packservice.service';

@Component({
  selector: 'app-packmodal',
  imports: [FormsModule, CommonModule],
  templateUrl: './packmodal.component.html',
  styleUrl: './packmodal.component.css',
})
export class PackmodalComponent implements OnChanges {
  @Input() pack: any = {
    packName: '',
    packDescription: '',
    durationMonths: '',
    monthlyPrice: '',
  };
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  modalTitle: string = 'Ajouter une offre';
  buttonText: string = 'Ajouter une offre';

  constructor(private packService: PackserviceService) {}

  ngOnChanges(): void {
    if (this.pack && this.pack.packId) {
      this.modalTitle = 'Modifier une offre';
      this.buttonText = 'Modifier une offre';
    } else {
      this.modalTitle = 'Ajouter une offre';
      this.buttonText = 'Ajouter une offre';
    }
  }

  savePack(): void {
    const packData = {
      packName: this.pack.packName,
      packDescription: this.pack.packDescription,
      durationMonths: this.pack.durationMonths,
      monthlyPrice: this.pack.monthlyPrice,
    };

    if (this.pack.packId) {
      this.packService.updatePack(this.pack.packId, packData).subscribe({
        next: (response) => {
          this.save.emit(response);
          this.closeModal();
        },
        error: (error) => {
          console.error("Erreur lors de la mise à jour d'une offre:", error);
        },
      });
    } else {
      this.packService.addPack(packData).subscribe({
        next: (response) => {
          this.save.emit(response);
          this.closeModal();
        },
        error: (error) => {
          console.error("Erreur lors de l'ajout d'une offre:", error);
        },
      });
    }
  }

  closeModal(): void {
    this.close.emit();
  }
}
