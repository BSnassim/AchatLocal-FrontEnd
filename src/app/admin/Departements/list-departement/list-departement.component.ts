import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { DepartementService } from 'src/app/Services/departement.service';
import { AppBreadcrumbService } from 'src/app/main/app-breadcrumb/app.breadcrumb.service';
import { Departement } from 'src/app/models/departement';

@Component({
  selector: 'app-list-departement',
  templateUrl: './list-departement.component.html',
  styleUrls: ['./list-departement.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ListDepartementComponent implements OnInit, OnDestroy {

  departementDialog: boolean;

  departementsList: Departement[];

  departement: Departement;

  selectedDepartements: Departement[];

  cols: any[];

  subscription: Subscription;

  constructor(
    private breadcrumbService: AppBreadcrumbService,
    private messageService: MessageService,
    private departementService: DepartementService,
    private confirmationService: ConfirmationService) {

    this.breadcrumbService.setItems([
      {
        label: "Gestion des departements"
      }, {
        label: "Liste des departements",
        routerLink: ["/administration/departements"]
      }
    ]);
    this.getData();
    this.subscription = this.departementService.refresh$.subscribe(() => {
      this.getData();
    });

  }

  ngOnInit() {
    this.cols = [
      { field: 'nom', header: 'Nom' },
    ];
  }

  openNew() {
    this.departement = null;
    this.departementDialog = true;
  }

  getData() {
    this.departementService.getDepartements().subscribe(data => {
      this.departementsList = data;
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

  editDepartement(departement: Departement) {
    this.departement = departement;
    this.departementDialog = true;
  }

  deleteDepartement(departement: Departement) {
      this.confirmationService.confirm({
          message: 'Voulez-vous vraiment supprimer ' + departement.nom + '?',
          header: 'Confirmer',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.departementService.deleteDepartement(departement.id).subscribe();
              this.messageService.add({ severity: 'réussi', summary: 'Réussi', detail: 'Departement supprimé', life: 3000 });
          }
      });
  }

  closeDialog() {
    this.departementDialog = false;
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

