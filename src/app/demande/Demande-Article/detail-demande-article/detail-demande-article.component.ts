import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BonDeCommandeService } from 'src/app/Services/bon-de-commande.service';
import { BonDeSortieService } from 'src/app/Services/bon-de-sortie.service';
import { DemandeAchatService } from 'src/app/Services/demande-achat.service';
import { DemandeArticleService } from 'src/app/Services/demande-article.service';
import { AppBreadcrumbService } from 'src/app/main/app-breadcrumb/app.breadcrumb.service';
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

  constructor(
    private breadCrumbService: AppBreadcrumbService,
    private route: ActivatedRoute,
    private router: Router,
    private demandeAchatService: DemandeAchatService,
    private bonDeSortieService: BonDeSortieService,
    private bonDeCommandeService: BonDeCommandeService,
    private demandeArticleService: DemandeArticleService
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
            this.nature = "magasinier";
          } else {
            this.getNature(data);
          }
        }
      });
    });
  }

  getNature(da: DemandeArticle) {
    this.demandeArticleService.getDemandeNature(da).subscribe(data => {
      this.nature = data;
    });
  }

}
