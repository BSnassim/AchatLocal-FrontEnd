import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService, Message } from 'primeng/api';
import { ArticleService } from 'src/app/Services/article.service';
import { CategorieService } from 'src/app/Services/categorie.service';
import { DemandeArticleService } from 'src/app/Services/demande-article.service';
import { AppBreadcrumbService } from 'src/app/main/app-breadcrumb/app.breadcrumb.service';
import { Article } from 'src/app/models/article';
import { Categorie } from 'src/app/models/categorie';
import { DemandeArticle } from 'src/app/models/demande-article';

@Component({
  selector: 'app-form-demande-article',
  templateUrl: './form-demande-article.component.html',
  styleUrls: ['./form-demande-article.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class FormDemandeArticleComponent implements OnInit {

  msgs: Message[] = [];

  categorieList: Categorie[];

  selectedCategorie: Categorie;

  articleList: Article[];

  selectedArticle: Article;

  quantite: number;

  besoin: string;

  hidden: boolean = false;

  details: string;

  constructor(private breadcrumbService: AppBreadcrumbService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private categorieService: CategorieService,
    private demandeArticleService: DemandeArticleService,
    private articleService: ArticleService) {
    this.breadcrumbService.setItems([
      {
        label: "Demandes",
        routerLink: ["demande/Liste-des-demandes"]
      },
      {
        label: "Formulaire de demande"
      }
    ])
  }

  ngOnInit(): void {
    this.categorieService.getCategories().subscribe((data) => {
      this.categorieList = data;
    })
  }

  changeType() {
    this.hidden = !this.hidden;
    this.selectedCategorie = null;
    this.selectedArticle = null;
    this.details = null;
    this.articleList = null;
  }

  onCategorieSelect() {
    this.articleService.getArticlesByCategorieId(this.selectedCategorie.id).subscribe((data) => {
      this.articleList = data;
    });
  }

  validateForm(): boolean {
    return ((this.selectedArticle != null || this.details != null) && this.selectedCategorie && this.quantite != null && this.besoin != null);
  }

  showErrorViaMessages() {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Erreur de validation', detail: 'Veuillez remplir tous les champs!' });
  }

  submitDemande() {
    if (this.validateForm()) {
      this.confirmationService.confirm({
        message: "Voulez-vous confirmer l'envoi de cette demande ?",
        header: 'Confirmer',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Oui',
        rejectLabel: 'Non',
        accept: () => {
          var d: DemandeArticle;
          if (this.hidden) {
            d = {
              dateDa: new Date(),
              besoin: this.besoin,
              extraArticle: this.details,
              extraCategorie: this.selectedCategorie,
              quantite: this.quantite
            }
          } else {
            d = {
              dateDa: new Date(),
              besoin: this.besoin,
              article: this.selectedArticle,
              quantite: this.quantite
            }
          };
          this.demandeArticleService.addDemandeArticle(d).subscribe();
          this.messageService.add({ severity: 'réussi', summary: 'Réussi', detail: 'Demande envoyé', life: 3000 });
          setTimeout(() => this.router.navigate([""]), 1000);
        }
      });
    }
    else {
      this.showErrorViaMessages();
    }
  }

}
