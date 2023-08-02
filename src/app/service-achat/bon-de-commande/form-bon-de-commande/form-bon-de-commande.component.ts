import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, ConfirmationService, Message } from 'primeng/api';
import { ArticleService } from 'src/app/Services/article.service';
import { BonDeCommandeService } from 'src/app/Services/bon-de-commande.service';
import { CategorieService } from 'src/app/Services/categorie.service';
import { DemandeArticleService } from 'src/app/Services/demande-article.service';
import { TokenService } from 'src/app/auth/services/token.service';
import { AppBreadcrumbService } from 'src/app/main/app-breadcrumb/app.breadcrumb.service';
import { Article } from 'src/app/models/article';
import { BonDeCommande } from 'src/app/models/bon-de-commande';
import { Categorie } from 'src/app/models/categorie';
import { DemandeArticle } from 'src/app/models/demande-article';
import { Utilisateur } from 'src/app/models/utilisateur';

@Component({
  selector: 'app-form-bon-de-commande',
  templateUrl: './form-bon-de-commande.component.html',
  styleUrls: ['./form-bon-de-commande.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class FormBonDeCommandeComponent implements OnInit {
  msgs: Message[] = [];

  hidden: boolean = false;

  demandeArticle: DemandeArticle;

  extraArticle: string;

  categorieList: Categorie[];

  selectedCategorie: Categorie;

  articleList: Article[];

  selectedArticle: Article;

  quantite: number;

  currentUser: Utilisateur;

  constructor(private breadcrumbService: AppBreadcrumbService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private categorieService: CategorieService,
    private bonDeCommandeService: BonDeCommandeService,
    private demandeArticleService: DemandeArticleService,
    private articleService: ArticleService,
    private router: Router,
    private tokenService: TokenService,
    private route: ActivatedRoute) {
    this.breadcrumbService.setItems([
      {
        label: "Bons de commande",
        routerLink: ["service-achat/Liste-bon-de-commande"]
      },
      {
        label: "Formulaire de commande"
      }
    ]);
  }

  ngOnInit(): void {
    this.categorieService.getCategoriesByType("Bon de commande").subscribe((data) => {
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
        message: "Voulez-vous confirmer l'envoi de cette commande ?",
        header: 'Confirmer',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Oui',
        rejectLabel: 'Non',
        accept: () => {
          var b: BonDeCommande = {
            dateCommande: new Date(),
            article: this.selectedArticle,
            quantite: this.quantite,
            extraArticle: this.extraArticle,
            extraCategorie: this.selectedCategorie,
            magasinier: this.currentUser
          }
          this.demandeArticle.etat = "En cours du traitement";
          this.demandeArticleService.editDemandeArticle(this.demandeArticle).subscribe();
          this.bonDeCommandeService.addBonDeCommande(b).subscribe();
          this.messageService.add({ severity: 'réussi', summary: 'Réussi', detail: 'Commande envoyé', life: 3000 });
          setTimeout(() => this.router.navigate(["service-chat/Liste-bon-de-commande"]), 1000);
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
