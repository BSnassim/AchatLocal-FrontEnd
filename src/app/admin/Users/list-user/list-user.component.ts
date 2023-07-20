import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { UtilisateurService } from 'src/app/Services/utilisateur.service';
import { AppBreadcrumbService } from 'src/app/main/app-breadcrumb/app.breadcrumb.service';
import { Utilisateur } from 'src/app/models/utilisateur';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ListUserComponent implements OnInit, OnDestroy{

  subscription : Subscription;
  
  userDialog: boolean;

  usersList: Utilisateur[];

  user: Utilisateur;

  selectedUsers: Utilisateur[];

  cols: any[];

  constructor(
    private breadcrumbService: AppBreadcrumbService,
    private messageService: MessageService,
    private userService: UtilisateurService,
    private confirmationService: ConfirmationService) {

    this.breadcrumbService.setItems([
      {
        label: "Gestion des utilisateurs"
      }, 
      {
        label: "Liste des utilisateurs",
        routerLink: ["/administration/users"]
      }
    ]);
    this.getData();
    this.subscription = this.userService.refresh$.subscribe(() => {
      this.getData();
    });

     }

     ngOnInit() {
      this.cols = [
        { field: 'nom', header: 'Nom' },
        { field: 'prenom', header: 'Prenom' },
        { field: 'email', header: 'Email' },
        { field: 'role', header: 'Role' },
        { field: 'departement', header: 'Departement'}
      ];
    }
  
    openNew() {
      this.user = null;
      this.userDialog = true;
    }
  
    getData() {
      this.userService.getUtilisateurs().subscribe(data => {
        this.usersList = data;
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
  
    editUser(user: Utilisateur) {
      this.user = user;
      this.userDialog = true;
    }
  
    deleteUser(user: Utilisateur) {
        this.confirmationService.confirm({
            message: 'Voulez-vous vraiment supprimer ' + user.email + '?',
            header: 'Confirmer',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.userService.deleteUtilisateur(user.id).subscribe();
                this.messageService.add({ severity: 'réussi', summary: 'Réussi', detail: 'Utilisateur supprimé', life: 3000 });
            }
        });
    }
  
    closeDialog() {
      this.userDialog = false;
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
  