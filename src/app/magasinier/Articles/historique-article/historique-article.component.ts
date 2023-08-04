import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
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
    private route: ActivatedRoute,
    private config: PrimeNGConfig) { }

  ngOnInit(): void {
    this.config.setTranslation({
      clear: 'Vider',
      apply: 'Appliquer',
      addRule: 'Ajouter Filtre',
      dateAfter: 'Date aprés',
      dateBefore: 'Date avant',
      dateIs: 'Date est',
      dateIsNot: "Date n'est pas",
      matchAll: 'Correspondre à tous',
      matchAny: "Correspondre à n'importe quel",
      startsWith: 'Commence par',
      endsWith: 'Se termine par',
      contains: 'Contient',
      notContains: 'Ne contient pas',
      equals: 'Egale',
      notEquals: 'Different de',
      lt: 'Inferieure à',
      lte: 'Inferieure ou egal à',
      gt: 'Superieure à',
      gte: 'Superieure ou egal à',
    })
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
