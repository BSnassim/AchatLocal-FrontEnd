import { Component, OnInit } from '@angular/core';
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

  constructor(private breadcrumbService: AppBreadcrumbService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private demandeArticleService: DemandeArticleService) {
    this.breadcrumbService.setItems([
      {
        label: "Liste des demandes",
        routerLink: ["demande/Liste-des-demandes"]
      }
    ])
  }

  ngOnInit(): void {
    this.demandeArticleService.getDemandeArticle().subscribe( (data) =>{
      this.demandeList = data;
    });
  }

  testArticleExistence(demande : DemandeArticle){
    return !(demande.article == null);
  }

  redirectToDetails(demande : DemandeArticle){
    
  }

}
