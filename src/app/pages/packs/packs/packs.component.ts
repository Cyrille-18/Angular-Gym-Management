import { Component } from '@angular/core';
import { PackserviceService } from '../../../services/packservice/packservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PackmodalComponent } from '../../../utils/packmodal/packmodal/packmodal.component';
import { ConfirmationmodalComponent } from '../../../utils/confirmationmodal/confirmationmodal/confirmationmodal.component';

@Component({
  selector: 'app-packs',
  imports: [
    CommonModule,
    FormsModule,
    PackmodalComponent,
    ConfirmationmodalComponent,
  ],
  templateUrl: './packs.component.html',
  styleUrl: './packs.component.css',
})
export class PacksComponent {
  packs: any[] = [];
  filteredpacks: any[] = [];
  searchTerm: string = '';
  selectedPack: any = null;
  isModalOpen = false;
  packResponse: any = null;
  showResponseModal: boolean = false;
  selectedPackName: string = '';
  isConfirmationModalOpen = false;
  selectedPackId: number = 0;

  constructor(private packService: PackserviceService) {}

  ngOnInit(): void {
    this.getPacks();
  }

  getPacks(): void {
    this.packService.getPacks().subscribe({
      next: (data) => {
        this.packs = data;
        this.filteredpacks = [...this.packs];
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des offres:', error);
      },
    });
  }

  filterpacks(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredpacks = [...this.packs];
    } else {
      this.filteredpacks = this.packs.filter((pack) =>
        pack.packName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  deletePack(id: number, packName: string): void {
    this.selectedPackId = id;
    this.selectedPackName = `${packName}`;
    this.isConfirmationModalOpen = true;
  }

  editPack(id: number): void {
    const packToEdit = this.packs.find((p) => p.packId === id);
    if (packToEdit) {
      this.selectedPack = { ...packToEdit };
      this.isModalOpen = true;
    } else {
      console.error("Offre avec l'ID " + id + ' non trouvé.');
    }
  }
  handleSavepack(response: any): void {
    this.packResponse = response;

    // Vérification si c'est un ajout ou une modification
    if (response && !response.packId) {
      // Si il n'y a pas de userId, c'est un ajout
      this.showResponseModal = true;
    } else {
      // Si il y a un userId, c'est une modification
      this.showResponseModal = false;
    }

    // Fermer le modal
    this.closeModal();
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedPack = null;
    this.getPacks();
  }

  openModal(): void {
    this.selectedPack = {
      packName: '',
      packDescription: '',
      durationMonths: '',
      monthlyPrice: '',
    };
    this.isModalOpen = true;
  }
  handledeletepackConfirmation(confirmed: boolean): void {
    if (confirmed && this.selectedPackId !== null && this.selectedPackName) {
      this.packService.deletePack(this.selectedPackId).subscribe({
        next: (response) => {
          this.getPacks();
          this.isConfirmationModalOpen = false;
        },
        error: (error) => {
          console.error("Erreur lors de la suppression de l'offre:", error);
        },
      });
    } else {
      this.isConfirmationModalOpen = false;
    }
  }
}
