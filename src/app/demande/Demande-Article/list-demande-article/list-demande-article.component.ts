import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AppBreadcrumbService } from 'src/app/main/app-breadcrumb/app.breadcrumb.service';
import { DemandeArticle } from 'src/app/models/demande-article';
import { DemandeArticleService } from 'src/app/Services/demande-article.service';

@Component({
  selector: 'app-list-demande-article',
  templateUrl: './list-demande-article.component.html',
  styleUrls: ['./list-demande-article.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ListDemandeArticleComponent implements OnInit {

  demandeList: DemandeArticle[];

  cols: any[];

  constructor(
    private breadcrumbService: AppBreadcrumbService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private demandeArticleService: DemandeArticleService,
    private router: Router
  ) {
    this.breadcrumbService.setItems([
      {
        label: "Liste des demandes",
        routerLink: ["demande/Liste-des-demandes"]
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

    this.demandeArticleService.getDemandeArticle().subscribe((data) => {
      this.demandeList = data;
    });
  }

  testArticleExistence(demande: DemandeArticle) {
    return !(demande.article == null);
  }

  redirectToDetails(demande: DemandeArticle) {
    let v1 = demande.id;
    this.router.navigate(["/demande/Details-demande", {id : v1}]);
  }

}
