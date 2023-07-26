import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/Services/article.service';
import { HistoriqueArticleService } from 'src/app/Services/historique-article.service';
import { AppBreadcrumbService } from 'src/app/main/app-breadcrumb/app.breadcrumb.service';
import { HistoriqueArticle } from 'src/app/models/historique-article';

@Component({
  selector: 'app-historique-article',
  templateUrl: './historique-article.component.html',
  styleUrls: ['./historique-article.component.scss']
})
export class HistoriqueArticleComponent implements OnInit {

  historiqueList : HistoriqueArticle[];

  cols: any[];
  
  constructor(
    private breadCrumbService: AppBreadcrumbService,
    private historiqueArticleService: HistoriqueArticleService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe( (params) => {
      this.historiqueArticleService.getHistoriqueByArticle(params.id).subscribe( (data)=> {
        data.forEach( (d) => {
          d.dateHistorique = new Date(d.dateHistorique);
        })
        this.historiqueList = data;
      });
    });
    this.cols = [
      { field: 'dateHistorique', header: 'Date' },
      { field: 'article.categorie.libelle', header: 'Categorie'},
      { field: 'article.libelle', header: 'Article'},
      { field: 'entre', header: 'Entrée'},
      { field: 'sortie', header: 'Sortie'},
      { field: 'magasinier.nom', header: 'Magasinier'}
    ];
  }

}
