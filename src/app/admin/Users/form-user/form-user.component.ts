import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DepartementService } from 'src/app/Services/departement.service';
import { UtilisateurService } from 'src/app/Services/utilisateur.service';
import { TokenService } from 'src/app/auth/services/token.service';
import { Departement } from 'src/app/models/departement';
import { Utilisateur } from 'src/app/models/utilisateur';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {
  @Input() userToEdit: Utilisateur;
  @Output() closeDialog = new EventEmitter<boolean>();

  roles = ["Administrateur", "Service achat", "Magasinier", "Utilisateur"];

  selectedRole: string;

  departements: Departement[];

  selectedDepartement: Departement;

  user: Utilisateur = new Utilisateur;

  nom: string;

  prenom: string;

  email: string = '';

  password: string = '';

  repeatedPass: string = '';

  oldPassword: string = '';

  errorEmail: string;

  errorPass: string;

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  noSpecial = /^[a-zàâçéèêëîïôûùüÿñæœ .-]*$/i

  constructor(
    private departementService: DepartementService,
    private userService: UtilisateurService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.departementService.getDepartements().subscribe(data => {
      this.departements = data;
    });

    if (this.userToEdit != null) {
      this.user.id = this.userToEdit.id;
      this.nom = this.userToEdit.nom;
      this.prenom = this.userToEdit.prenom;
      this.email = this.userToEdit.email;
      this.selectedRole = this.userToEdit.role;
      this.selectedDepartement = this.userToEdit.departement;
    };
  };

  async onSubmit() {
    if (this.userToEdit == null) {
      this.userService.getUtilisateurByEmail(this.email).subscribe(data => {
        if (data != null) {
          this.errorEmail = "Email existe déjà";
        }
        else {
          this.user = {
            departement: this.selectedDepartement,
            email: this.email,
            nom: this.nom,
            prenom: this.prenom,
            password: this.password,
            role: this.selectedRole,
          };
          this.userService.addUtilisateur(this.user).subscribe();
          this.closeDialog.emit(false);
        };
      });
    } else {
      this.userService.getUtilisateurByEmail(this.email).subscribe(async data => {
        if (data != null && data.email != this.userToEdit.email) {
          this.errorEmail = "Email existe déjà";
        } else {
          console.log(this.errorEmail);
          console.log(this.errorPass);
          this.errorEmail = "";
          const req2 = await this.tokenService.checkPassword(this.oldPassword, this.userToEdit.password).toPromise();
          if (req2 == false) {
            this.errorPass = "Mot de passe actuel invalide";
          }
          else this.errorPass = "";
          if (this.errorEmail == "" && this.errorPass == "") {
            this.user = {
              id: this.userToEdit.id,
              departement: this.selectedDepartement,
              email: this.email,
              nom: this.nom,
              prenom: this.prenom,
              password: this.password,
              role: this.selectedRole,
            };
            this.userService.editUtilisateur(this.user).subscribe();
            this.closeDialog.emit(false);
          };

        }
      });
    }
  }

  terminateDialog() {
    this.closeDialog.emit(false);
  }

  validateEmail() {
    return (this.email.length !== 0 && !(this.emailRegex.test(this.email)));
  }

  validatePassword() {
    if (this.password.length < 6 && this.password.length > 0)
      return "Mot de passe doit être 6 caractéres au minimum";
    else if (this.password != this.repeatedPass && this.repeatedPass.length > 0)
      return "Le mot de passe n'est pas le même";
    else return "";
  }

  validateNumbers(field) {
    if (field != null)
      return field.toString().length !== 8;
    else return false;
  }

  allValidated() {
    let empty = (this.nom == '' || this.prenom == '' || this.email == ''
      || this.password == '' || this.repeatedPass == '' ||
      this.selectedRole == null || this.selectedDepartement == null);
    return (this.validateEmail() || this.validatePassword() != '' || empty);
  }

}