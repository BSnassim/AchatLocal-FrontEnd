import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ArticleService } from 'src/app/Services/article.service';
import { AppBreadcrumbService } from 'src/app/main/app-breadcrumb/app.breadcrumb.service';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class ListArticleComponent implements OnInit, OnDestroy {

  
  subscription: Subscription;

  articleDialog: boolean;

  articlesList: Article[];

  article: Article;

  selectedArticles: Article[];

  cols: any[];

  constructor(
    private breadcrumbService: AppBreadcrumbService,
    private messageService: MessageService,
    private articleService: ArticleService,
    private router: Router,
    private confirmationService: ConfirmationService) {

    this.breadcrumbService.setItems([
      {
        label: "Gestion des articles"
      },
      {
        label: "Liste des articles",
        routerLink: ["/magasinier/articles"]
      }
    ]);
    this.getData();
    this.subscription = this.articleService.refresh$.subscribe(() => {
      this.getData();
    });

  }

  ngOnInit() {
    this.cols = [
      { field: 'libelle', header: 'Libelle' },
      { field: 'stock', header: 'Stock'},
      { field: 'caracteristiques', header: 'Caracteristiques'},
      { field: 'marque', header: 'Marque'}
    ];
  }

  openNew() {
    this.article = null;
    this.articleDialog = true;
  }

  getData() {
    this.articleService.getArticles().subscribe(data => {
      this.articlesList = data;
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

  editArticle(article: Article) {
    this.article = article;
    this.articleDialog = true;
  }

  deleteArticle(article: Article) {
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer ' + article.libelle + '?',
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.articleService.deleteArticle(article.id).subscribe();
        this.messageService.add({ severity: 'réussi', summary: 'Réussi', detail: 'Article supprimé', life: 3000 });
      }
    });
  }

  closeDialog() {
    this.articleDialog = false;
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

  toHistory(id:number){
    let v1 = id;
    this.router.navigate(["magasinier/historique-article",{id:v1}]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
