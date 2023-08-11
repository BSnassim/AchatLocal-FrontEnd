import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategorieService } from 'src/app/Services/categorie.service';
import { Categorie } from 'src/app/models/categorie';

@Component({
  selector: 'app-form-categorie',
  templateUrl: './form-categorie.component.html',
  styleUrls: ['./form-categorie.component.scss']
})
export class FormCategorieComponent implements OnInit {
  @Input() categorieToEdit: Categorie;
  @Output() closeDialog = new EventEmitter<boolean>();

  noSpecial = /^[a-zàâçéèêëîïôûùüÿñæœ .-]*$/i

  categorie: Categorie = new Categorie;

  libelle: string;

  typeImportation: string;

  types = ["Bon de commande", "Demande d'achat"];

  constructor(private categorieService: CategorieService) { }

  ngOnInit(): void {
    if (this.categorieToEdit != null) {
      this.categorie.id = this.categorieToEdit.id;
      this.libelle = this.categorieToEdit.libelle;
      this.typeImportation = this.categorieToEdit.typeImportation;
    };
  }

  onSubmit() {
    if (this.categorieToEdit == null) {
      this.categorie.libelle = this.libelle;
      this.categorie.typeImportation = this.typeImportation;
      this.categorieService.addCategorie(this.categorie).subscribe();
    }
    else {
      this.categorie.libelle = this.libelle;
      this.categorie.typeImportation = this.typeImportation;
      this.categorieService.editCategorie(this.categorie).subscribe();
    }
    this.closeDialog.emit(false);
  }

  terminateDialog() {
    this.closeDialog.emit(false);
  }

}
