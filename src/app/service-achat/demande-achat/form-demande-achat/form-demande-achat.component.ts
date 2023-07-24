import { Component, OnInit } from '@angular/core';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { ArticleService } from 'src/app/Services/article.service';
import { CategorieService } from 'src/app/Services/categorie.service';
import { DemandeAchatService } from 'src/app/Services/demande-achat.service';
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
    private articleService: ArticleService) {
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
    })
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

}