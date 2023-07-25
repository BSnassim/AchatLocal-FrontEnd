import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { ArticleService } from 'src/app/Services/article.service';
import { CategorieService } from 'src/app/Services/categorie.service';
import { DemandeAchatService } from 'src/app/Services/demande-achat.service';
import { DemandeArticleService } from 'src/app/Services/demande-article.service';
import { AppBreadcrumbService } from 'src/app/main/app-breadcrumb/app.breadcrumb.service';
import { Article } from 'src/app/models/article';
import { Categorie } from 'src/app/models/categorie';
import { DemandeAchat } from 'src/app/models/demande-achat';

@Component({
  selector: 'app-form-demande-achat',
  templateUrl: './form-demande-achat.component.html',
  styleUrls: ['./form-demande-achat.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class FormDemandeAchatComponent implements OnInit {

  msgs: Message[] = [];

  hidden: boolean = false;

  extraArticle: string;

  categorieList: Categorie[];

  selectedCategorie: Categorie;

  articleList: Article[];

  selectedArticle: Article;

  quantite: number;

  constructor(private breadcrumbService: AppBreadcrumbService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private categorieService: CategorieService,
    private demandeAchatService: DemandeAchatService,
    private articleService: ArticleService,
    private demandeArticleService: DemandeArticleService,
    private route: ActivatedRoute) {
    this.breadcrumbService.setItems([
      {
        label: "Demandes d'achat",
        routerLink: ["service-achat/Liste-demande-achat"]
      },
      {
        label: "Formulaire de demande d'achat"
      }
    ]);
  }

  ngOnInit(): void {
    this.categorieService.getCategoriesByType("Demande d'achat").subscribe((data) => {
      this.categorieList = data;
    });
    this.route.params.subscribe((params) => {
      this.demandeArticleService.getDemandeArticleById(params.id).subscribe(data => {
        if (data != null) {
          if (data.article == null) {
            this.hidden = true;
            this.quantite = data.quantite;
            this.selectedCategorie = data.extraCategorie;
            this.extraArticle = data.extraArticle;
          }
          else {
            this.quantite = data.quantite;
            this.selectedCategorie = data.article.categorie;
            this.onCategorieSelect();
            this.selectedArticle = data.article;
          }
        }
      });
    });
  }

  onCategorieSelect() {
    this.articleService.getArticlesByCategorieId(this.selectedCategorie.id).subscribe((data) => {
      this.articleList = data;
    });
  }

  validateForm(): boolean {
    return (this.selectedArticle != null && this.quantite != null);
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
          var d: DemandeAchat = {
            dateAchat: new Date(),
            article: this.selectedArticle,
            quantite: this.quantite,
            extraArticle: this.extraArticle
          }
          this.demandeAchatService.addDemandeAchat(d).subscribe();
          this.messageService.add({ severity: 'réussi', summary: 'Réussi', detail: 'Demande envoyé', life: 3000 });
        }
      });
    }
    else {
      this.showErrorViaMessages();
    }
  }

  changeType() {
    this.hidden = !this.hidden;
    this.selectedCategorie = null;
    this.selectedArticle = null;
    this.extraArticle = null;
    this.articleList = null;
  }

}
