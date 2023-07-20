import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DepartementService } from 'src/app/Services/departement.service';
import { Departement } from 'src/app/models/departement';

@Component({
  selector: 'app-form-departement',
  templateUrl: './form-departement.component.html',
  styleUrls: ['./form-departement.component.scss']
})
export class FormDepartementComponent implements OnInit {
  @Input() departementToEdit: Departement;
  @Output() closeDialog = new EventEmitter<boolean>();

  noSpecial = /^[a-zàâçéèêëîïôûùüÿñæœ .-]*$/i

  departement: Departement = new Departement;

  nom: string;

  constructor(private departementService: DepartementService) { }

  ngOnInit(): void {
    if (this.departementToEdit != null) {
      this.departement.id = this.departementToEdit.id;
      this.nom = this.departementToEdit.nom;
    };
  }

  onSubmit() {
    if (this.departementToEdit == null) {
      this.departement.nom = this.nom;
      this.departementService.addDepartement(this.departement).subscribe();
    }
    else {
      this.departement.nom = this.nom;
      this.departementService.editDepartement(this.departement).subscribe();
    }
    this.closeDialog.emit(false);
  }

  terminateDialog() {
    this.closeDialog.emit(false);
  }

}
