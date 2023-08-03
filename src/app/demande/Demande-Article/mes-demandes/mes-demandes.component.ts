import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DemandeArticleService } from 'src/app/Services/demande-article.service';
import { TokenService } from 'src/app/auth/services/token.service';
import { AppBreadcrumbService } from 'src/app/main/app-breadcrumb/app.breadcrumb.service';
import { DemandeArticle } from 'src/app/models/demande-article';
import { Utilisateur } from 'src/app/models/utilisateur';

@Component({
  selector: 'app-mes-demandes',
  templateUrl: './mes-demandes.component.html',
  styleUrls: ['./mes-demandes.component.scss']
})
export class MesDemandesComponent implements OnInit {

  demandeList: DemandeArticle[];

  cols: any[];

  currentUser : Utilisateur;

  constructor(
    private tokenService: TokenService,
    private breadcrumbService: AppBreadcrumbService,
    private demandeArticleService: DemandeArticleService,
    private router: Router
  ) {
    this.breadcrumbService.setItems([
      {
        label: "Liste des demandes",
        routerLink: ["demande/Mes-demandes"]
      }
    ])
  }

  ngOnInit(): void {
    this.cols = [
      { field: 'article', header: 'Article' },
      { field: 'demandeur', header: 'Demandeur' },
      { field: 'quantite', header: 'Quantite' },
      { field: 'dateDa', header: 'DateDa' },
      { field: 'etat', header: 'Etat'}
    ];
    this.tokenService.getUser().subscribe( u => {
      this.currentUser = u;
      this.demandeArticleService.getDemandeArticleByUser(u.id).subscribe((data) => {
        this.demandeList = data;
        console.log(u.id);
      });
    })
  }

  testArticleExistence(demande: DemandeArticle) {
    return !(demande.article == null);
  }

}
