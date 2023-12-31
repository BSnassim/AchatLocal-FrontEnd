import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BonDeCommandeService } from 'src/app/Services/bon-de-commande.service';
import { BonDeSortieService } from 'src/app/Services/bon-de-sortie.service';
import { DemandeAchatService } from 'src/app/Services/demande-achat.service';
import { DemandeArticleService } from 'src/app/Services/demande-article.service';
import { TokenService } from 'src/app/auth/services/token.service';
import { AppBreadcrumbService } from 'src/app/main/app-breadcrumb/app.breadcrumb.service';
import { BonDeSortie } from 'src/app/models/bon-de-sortie';
import { DemandeArticle } from 'src/app/models/demande-article';
import { Utilisateur } from 'src/app/models/utilisateur';

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

  bDisabled : boolean = false;

  currentUser : Utilisateur;

  constructor(
    private breadCrumbService: AppBreadcrumbService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService,
    private bonDeSortieService: BonDeSortieService,
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
    this.tokenService.getUser().subscribe( data => {
      this.currentUser = data;
    })
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
          if( this.demandeArticle.etat == "Terminé")
          this.bDisabled = true;
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
            let bs: BonDeSortie = { dateSortie: new Date(), demandeArticle: this.demandeArticle, magasinier: this.currentUser };
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

  openPDF() {
    this.demandeArticleService.getDemandeArticlePDF(this.demandeArticle.id).subscribe((content: ArrayBuffer) => {
      this.createDownloadLink(content);
    });
  }

  createDownloadLink(pdfData: ArrayBuffer) {
    const blob = new Blob([pdfData], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Demande Article.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
  }

}
