import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BonDeCommandeService } from 'src/app/Services/bon-de-commande.service';
import { BonDeSortieService } from 'src/app/Services/bon-de-sortie.service';
import { DemandeAchatService } from 'src/app/Services/demande-achat.service';
import { DemandeArticleService } from 'src/app/Services/demande-article.service';
import { AppBreadcrumbService } from 'src/app/main/app-breadcrumb/app.breadcrumb.service';
import { BonDeCommande } from 'src/app/models/bon-de-commande';
import { BonDeSortie } from 'src/app/models/bon-de-sortie';
import { DemandeAchat } from 'src/app/models/demande-achat';
import { DemandeArticle } from 'src/app/models/demande-article';

@Component({
  selector: 'app-detail-demande-article',
  templateUrl: './detail-demande-article.component.html',
  styleUrls: ['./detail-demande-article.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class DetailDemandeArticleComponent implements OnInit {

  demandeArticle: DemandeArticle;

  nature: string;

  articleNull = false;

  constructor(
    private breadCrumbService: AppBreadcrumbService,
    private route: ActivatedRoute,
    private router: Router,
    private demandeAchatService: DemandeAchatService,
    private bonDeSortieService: BonDeSortieService,
    private bonDeCommandeService: BonDeCommandeService,
    private demandeArticleService: DemandeArticleService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.breadCrumbService.setItems([
      {
        label: "Liste des demandes",
        routerLink: ["demande/Liste-des-demandes"]
      },
      {
        label: "Details"
      }
    ])
  }

  ngOnInit(): void {
    this.getDemandeArticle();
  }

  getDemandeArticle() {
    this.route.params.subscribe((params) => {
      this.demandeArticleService.getDemandeArticleById(params.id).subscribe(data => {
        if (data == null) {
          this.router.navigate(["notfound"]);
        } else {
          this.demandeArticle = data;
          if (data.article == null) {
            this.articleNull = true;
          }
          this.getNature(data);

        }
      });
    });
  }

  getNature(da: DemandeArticle) {
    if (this.articleNull) {
      this.nature = da.extraCategorie.typeImportation;
    }
    else if (da.quantite > da.article.stock) {
      this.nature = da.article.categorie.typeImportation;
    }
    else {
      this.nature = "Bon de sortie";
    }
  }

  submit() {
    this.confirmationService.confirm({
      message: "Voulez-vous confirmer l'envoi de votre " + this.nature + " ?",
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      accept: () => {
        let v1 = this.demandeArticle.id;
        switch (this.nature) {
          case "Bon de sortie":
            let bs: BonDeSortie = { dateSortie: new Date(), demandeArticle: this.demandeArticle };
            this.bonDeSortieService.addBonDeSortie(bs).subscribe();
            this.messageService.add({ severity: 'réussi', summary: 'Réussi', detail: this.nature + ' envoyé', life: 3000 });
            setTimeout(() => this.router.navigate(["demande/Liste-des-demandes"]), 1000);
            break;
          case "Bon de commande":
            this.router.navigate(["/service-achat/Formulaire-bon-de-commande", { id: v1 }]);
            break;
          case "Demande d'achat":
            this.router.navigate(["/service-achat/Formulaire-demande-achat", { id: v1 }]);
            break;
        };
      }
    });
  }

}
