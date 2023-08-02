import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { ArticleService } from 'src/app/Services/article.service';
import { CategorieService } from 'src/app/Services/categorie.service';
import { DemandeAchatService } from 'src/app/Services/demande-achat.service';
import { DemandeArticleService } from 'src/app/Services/demande-article.service';
import { TokenService } from 'src/app/auth/services/token.service';
import { AppBreadcrumbService } from 'src/app/main/app-breadcrumb/app.breadcrumb.service';
import { Article } from 'src/app/models/article';
import { Categorie } from 'src/app/models/categorie';
import { DemandeAchat } from 'src/app/models/demande-achat';
import { DemandeArticle } from 'src/app/models/demande-article';
import { Utilisateur } from 'src/app/models/utilisateur';

@Component({
  selector: 'app-form-demande-achat',
  templateUrl: './form-demande-achat.component.html',
  styleUrls: ['./form-demande-achat.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class FormDemandeAchatComponent implements OnInit {

  msgs: Message[] = [];

  hidden: boolean = false;

  demandeArticle: DemandeArticle;

  extraArticle: string;

  categorieList: Categorie[];

  selectedCategorie: Categorie;

  articleList: Article[];

  selectedArticle: Article;

  quantite: number;

  currentUser : Utilisateur;

  constructor(private breadcrumbService: AppBreadcrumbService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private categorieService: CategorieService,
    private demandeAchatService: DemandeAchatService,
    private articleService: ArticleService,
    private demandeArticleService: DemandeArticleService,
    private router: Router,
    private tokenService: TokenService,
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
          this.demandeArticle = data;
          if (data.article == null) {
            this.hidden = true;
            this.quantite = data.quantite;
            this.selectedCategorie = data.extraCategorie;
            this.onCategorieSelect();
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
    this.tokenService.getUser().subscribe( user => {
      this.currentUser = user;
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
            extraArticle: this.extraArticle,
            extraCategorie: this.selectedCategorie,
            magasinier: this.currentUser
          }
          this.demandeArticle.etat = "En cours du traitement";
          this.demandeArticleService.editDemandeArticle(this.demandeArticle).subscribe();
          this.demandeAchatService.addDemandeAchat(d).subscribe();
          this.messageService.add({ severity: 'réussi', summary: 'Réussi', detail: 'Demande envoyé', life: 3000 });
          setTimeout(() => this.router.navigate(["service-achat/Liste-demande-achat"]), 1000);
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
