import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ArticleService } from 'src/app/Services/article.service';
import { CategorieService } from 'src/app/Services/categorie.service';
import { DemandeArticleService } from 'src/app/Services/demande-article.service';
import { AppBreadcrumbService } from 'src/app/main/app-breadcrumb/app.breadcrumb.service';
import { Article } from 'src/app/models/article';
import { Categorie } from 'src/app/models/categorie';

@Component({
  selector: 'app-form-demande-article',
  templateUrl: './form-demande-article.component.html',
  styleUrls: ['./form-demande-article.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class FormDemandeArticleComponent implements OnInit {

  categorieList: Categorie[];

  selectedCategorie: Categorie;

  articleList: Article[];

  selectedArticle: Article;

  quantite: number;

  besoin: string;

  hidden:boolean = false;

  details: string;

  constructor(private breadcrumbService: AppBreadcrumbService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private categorieService: CategorieService,
    private demandeArticleService: DemandeArticleService,
    private articleService: ArticleService) {
      this.breadcrumbService.setItems([
        {
          label:"Demandes",
          routerLink:["demande/Liste-des-demandes"]
        },
        {
          label:"Formulaire de demande"
        }
      ])
     }

  ngOnInit(): void {
    this.categorieService.getCategories().subscribe( (data)=>{
      this.categorieList = data;
    })
  }

  changeType(){
    this.hidden = !this.hidden;
    this.selectedCategorie = null;
    this.selectedArticle = null;
    this.details = null;
  }

  onCategorieSelect(){
    this.articleService.getArticlesByCategorieId(this.selectedCategorie.id).subscribe((data)=>{
      this.articleList = data;
    })
  }

}
