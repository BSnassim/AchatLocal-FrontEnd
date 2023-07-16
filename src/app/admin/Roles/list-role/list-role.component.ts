import { Component, OnDestroy, OnInit } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { Subscription } from "rxjs";
import { RoleService } from "src/app/Services/role.service";
import { Product } from "src/app/demo/domain/product";
import { ProductService } from "src/app/demo/service/productservice";
import { AppBreadcrumbService } from "src/app/main/app-breadcrumb/app.breadcrumb.service";
import { Role } from "src/app/models/role";


@Component({
  selector: "app-list-role",
  templateUrl: "./list-role.component.html",
  styleUrls: ["./list-role.component.scss"],
  providers: [MessageService, ConfirmationService]
})
export class ListRoleComponent implements OnInit, OnDestroy {

  roleDialog: boolean;

  rolesList: Role[];

  role: Role;

  selectedRoles: Role[];

  cols: any[];

  subscription: Subscription;

  constructor(
    private breadcrumbService: AppBreadcrumbService,
    private messageService: MessageService,
    private roleService: RoleService,
    private confirmationService: ConfirmationService) {

    this.breadcrumbService.setItems([
      {
        label: "Gestion des roles"
      }, {
        label: "Liste des roles",
        routerLink: ["/administration/roles"]
      }
    ]);
    this.getData();
    this.subscription = this.roleService.refresh$.subscribe(() => {
      this.getData();
    });

  }

  ngOnInit() {
    this.cols = [
      { field: 'nom', header: 'Nom' },
    ];
  }

  openNew() {
    this.role = null;
    this.roleDialog = true;
  }

  getData() {
    this.roleService.getRoles().subscribe(data => {
      this.rolesList = data;
    });
  }

  // deleteSelectedProducts() {
  //     this.confirmationService.confirm({
  //         message: 'Are you sure you want to delete the selected products?',
  //         header: 'Confirm',
  //         icon: 'pi pi-exclamation-triangle',
  //         accept: () => {
  //             this.products = this.products.filter(val => !this.selectedProducts.includes(val));
  //             this.selectedProducts = null;
  //             this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
  //         }
  //     });
  // }

  editRole(role: Role) {
    this.role = role;
    this.roleDialog = true;
  }

  deleteRole(role: Role) {
      this.confirmationService.confirm({
          message: 'Voulez-vous vraiment supprimer ' + role.nom + '?',
          header: 'Confirmer',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.roleService.deleteRole(role.id).subscribe();
              this.messageService.add({ severity: 'réussi', summary: 'Réussi', detail: 'Role supprimé', life: 3000 });
          }
      });
  }

  closeDialog() {
    this.roleDialog = false;
  }

  // findIndexById(id: string): number {
  //     let index = -1;
  //     for (let i = 0; i < this.products.length; i++) {
  //         if (this.products[i].id === id) {
  //             index = i;
  //             break;
  //         }
  //     }

  //     return index;
  // }

  // createId(): string {
  //     let id = '';
  //     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //     for (let i = 0; i < 5; i++) {
  //         id += chars.charAt(Math.floor(Math.random() * chars.length));
  //     }
  //     return id;
  // }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
