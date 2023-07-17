import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { CategorieService } from 'src/app/Services/categorie.service';
import { AppBreadcrumbService } from 'src/app/main/app-breadcrumb/app.breadcrumb.service';
import { Categorie } from 'src/app/models/categorie';

@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
  styleUrls: ['./list-categorie.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ListCategorieComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  categorieDialog: boolean;

  categoriesList: Categorie[];

  categorie: Categorie;

  selectedCategories: Categorie[];

  cols: any[];

  constructor(
    private breadcrumbService: AppBreadcrumbService,
    private messageService: MessageService,
    private categorieService: CategorieService,
    private confirmationService: ConfirmationService) {

    this.breadcrumbService.setItems([
      {
        label: "Gestion des categories des articles"
      },
      {
        label: "Liste des categories des articles",
        routerLink: ["/magasinier/categories"]
      }
    ]);
    this.getData();
    this.subscription = this.categorieService.refresh$.subscribe(() => {
      this.getData();
    });

  }

  ngOnInit() {
    this.cols = [
      { field: 'libelle', header: 'Libelle' },
    ];
  }

  openNew() {
    this.categorie = null;
    this.categorieDialog = true;
  }

  getData() {
    this.categorieService.getCategories().subscribe(data => {
      this.categoriesList = data;
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

  editCategorie(categorie: Categorie) {
    this.categorie = categorie;
    this.categorieDialog = true;
  }

  deleteCategorie(categorie: Categorie) {
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer ' + categorie.libelle + '?',
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categorieService.deleteCategorie(categorie.id).subscribe();
        this.messageService.add({ severity: 'réussi', summary: 'Réussi', detail: 'Categorie supprimé', life: 3000 });
      }
    });
  }

  closeDialog() {
    this.categorieDialog = false;
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
