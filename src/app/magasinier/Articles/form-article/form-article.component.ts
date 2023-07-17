import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticleService } from 'src/app/Services/article.service';
import { CategorieService } from 'src/app/Services/categorie.service';
import { Article } from 'src/app/models/article';
import { Categorie } from 'src/app/models/categorie';

@Component({
  selector: 'app-form-article',
  templateUrl: './form-article.component.html',
  styleUrls: ['./form-article.component.scss']
})
export class FormArticleComponent implements OnInit {
  @Input() articleToEdit: Article;
  @Output() closeDialog = new EventEmitter<boolean>();

  noSpecial = /^[a-zàâçéèêëîïôûùüÿñæœ .-]*$/i

  article: Article = new Article;

  libelle: string;

  stock: number;

  caracteristiques: string;

  marque: string;

  categories: Categorie[];

  selectedCategorie: Categorie;

  constructor(private articleService: ArticleService, private categorieService: CategorieService) { }

  ngOnInit(): void {
    this.categorieService.getCategories().subscribe( data => {
      this.categories = data;
    })
    if (this.articleToEdit != null) {
      this.article.id = this.articleToEdit.id;
      this.libelle = this.articleToEdit.libelle;
      this.stock = this.articleToEdit.stock;
      this.caracteristiques = this.articleToEdit.caracteristiques;
      this.marque = this.articleToEdit.marque;
      // this.selectedCategorie = this.articleToEdit.categorie
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
    }
    this.closeDialog.emit(false);
  }

  terminateDialog() {
    this.closeDialog.emit(false);
  }

}
