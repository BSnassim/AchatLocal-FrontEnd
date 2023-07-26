import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticleService } from 'src/app/Services/article.service';
import { CategorieService } from 'src/app/Services/categorie.service';
import { HistoriqueArticleService } from 'src/app/Services/historique-article.service';
import { Article } from 'src/app/models/article';
import { Categorie } from 'src/app/models/categorie';
import { HistoriqueArticle } from 'src/app/models/historique-article';

@Component({
  selector: 'app-form-article',
  templateUrl: './form-article.component.html',
  styleUrls: ['./form-article.component.scss']
})
export class FormArticleComponent implements OnInit {
  @Input() articleToEdit: Article;
  @Output() closeDialog = new EventEmitter<boolean>();

  article: Article = new Article;

  libelle: string;

  stock: number;

  caracteristiques: string;

  marque: string;

  categories: Categorie[];

  selectedCategorie: Categorie;

  constructor(
    private articleService: ArticleService,
    private categorieService: CategorieService,
    private historiqueService: HistoriqueArticleService
  ) { }

  ngOnInit(): void {
    this.categorieService.getCategories().subscribe(data => {
      this.categories = data;
    })
    if (this.articleToEdit != null) {
      this.article.id = this.articleToEdit.id;
      this.libelle = this.articleToEdit.libelle;
      this.stock = this.articleToEdit.stock;
      this.caracteristiques = this.articleToEdit.caracteristiques;
      this.marque = this.articleToEdit.marque;
      this.selectedCategorie = this.articleToEdit.categorie;
    };
  }

  onSubmit() {
    if (this.articleToEdit == null) {
      this.article.libelle = this.libelle;
      this.article.caracteristiques = this.caracteristiques;
      this.article.stock = this.stock;
      this.article.marque = this.marque;
      this.article.categorie = this.selectedCategorie;
      this.articleService.addArticle(this.article).subscribe();
    }
    else {
      
      this.article.libelle = this.libelle;
      this.article.caracteristiques = this.caracteristiques;
      this.article.stock = this.stock;
      this.article.marque = this.marque;
      this.article.categorie = this.selectedCategorie;
      this.articleService.editArticle(this.article).subscribe();
      if (this.stock < this.articleToEdit.stock) {
        let h1: HistoriqueArticle = {
          article: this.article,
          dateHistorique: new Date(),
          sortie: this.articleToEdit.stock - this.stock
        }
        this.historiqueService.addHistoriqueArticle(h1).subscribe();
      } else if (this.stock > this.articleToEdit.stock){
        let h2: HistoriqueArticle = {
          article: this.article,
          dateHistorique: new Date(),
          entre: this.stock - this.articleToEdit.stock
        }
        this.historiqueService.addHistoriqueArticle(h2).subscribe();
      }
    }
    this.closeDialog.emit(false);
  }

  terminateDialog() {
    this.closeDialog.emit(false);
  }

}
