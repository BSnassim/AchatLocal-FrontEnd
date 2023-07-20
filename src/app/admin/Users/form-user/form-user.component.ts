import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DepartementService } from 'src/app/Services/departement.service';
import { RoleService } from 'src/app/Services/role.service';
import { UtilisateurService } from 'src/app/Services/utilisateur.service';
import { Departement } from 'src/app/models/departement';
import { Role } from 'src/app/models/role';
import { Utilisateur } from 'src/app/models/utilisateur';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {
  @Input() userToEdit: Utilisateur;
  @Output() closeDialog = new EventEmitter<boolean>();

  roles: Role[];

  selectedRole: Role;

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

  constructor(private roleService: RoleService,
    private departementService: DepartementService,
    private userService: UtilisateurService,
    // private tokenService: TokenService
    ) { }

  ngOnInit(): void {
    this.roleService.getRoles().subscribe(data => {
      this.roles = data;
    });
    this.departementService.getDepartements().subscribe( data => {
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
    // if (this.userToEdit == null) {

    //   this.userService.getUserById(this.cin).subscribe(dataU => {
    //     if (dataU != null) {
    //       this.errorCIN = "CIN existe déja";
    //       this.userService.emailAlreadyExists(this.email).subscribe(data => {
    //         if (data != null) {
    //           this.errorEmail = "Email existe déjà";
    //         }
    //       });
    //     } else {
    //       this.errorCIN = "";
    //       this.userService.emailAlreadyExists(this.email).subscribe(data => {
    //         if (data != null) {
    //           this.errorEmail = "Email existe déjà";
    //         } else {
    //           this.user.profil = this.selectedProfil;
    //           this.user.agence = this.selectedAgence;
    //           this.user.nom = this.nom;
    //           this.user.prenom = this.prenom;
    //           this.user.dateNais = this.dateN;
    //           this.user.email = this.email;
    //           this.user.password = this.password;
    //           this.user.tel = this.tel;
    //           this.user.id = this.cin;
    //           this.userService.addUser(this.user).subscribe();
    //           this.closeDialog.emit(false);
    //         };
    //       });
    //     }
    //   })
    // }
    // else {
    //   const req1 = await this.userService.emailAlreadyExists(this.email).toPromise();
    //   if (req1 != null && req1.email != this.userToEdit.email) {
    //     this.errorEmail = "Email utilisé par un autre utilisateur";
    //   }
    //   else this.errorEmail = "";

    //   const req2 = await this.tokenService.checkPassword(this.oldPassword, this.userToEdit.password).toPromise();
    //   if (req2 == false) {
    //     this.errorPass = "Mot de passe actuel invalide";
    //   }
    //   else this.errorPass = "";


    //   if (this.errorEmail == "" && this.errorPass == "") {

    //     this.user.profil = this.selectedProfil;
    //     this.user.agence = this.selectedAgence;
    //     this.user.nom = this.nom;
    //     this.user.prenom = this.prenom;
    //     this.user.dateNais = this.dateN;
    //     this.user.email = this.email;
    //     this.user.password = this.password;
    //     this.user.tel = this.tel;
    //     this.userService.EditUser(this.user).subscribe();
    //     this.closeDialog.emit(false);
    //   };

    // }
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