import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RoleService } from 'src/app/Services/role.service';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-form-role',
  templateUrl: './form-role.component.html',
  styleUrls: ['./form-role.component.scss']
})
export class FormRoleComponent implements OnInit {
  @Input() roleToEdit: Role;
  @Output() closeDialog = new EventEmitter<boolean>();

  noSpecial = /^[a-zàâçéèêëîïôûùüÿñæœ .-]*$/i

  role: Role = new Role;

  nom: string;

  constructor(private roleService: RoleService) { }

  ngOnInit(): void {
    if (this.roleToEdit != null) {
      this.role.id = this.roleToEdit.id;
      this.nom = this.roleToEdit.nom;
    };
  }

  onSubmit() {
    if (this.roleToEdit == null) {
      this.role.nom = this.nom;
      this.roleService.addRole(this.role).subscribe();
    }
    else {
      this.role.nom = this.nom;
      this.roleService.editRole(this.role).subscribe();
    }
    this.closeDialog.emit(false);
  }

  terminateDialog() {
    this.closeDialog.emit(false);
  }

}
