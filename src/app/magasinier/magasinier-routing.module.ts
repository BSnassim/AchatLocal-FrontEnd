import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCategorieComponent } from './Categories/list-categorie/list-categorie.component';
import { ListArticleComponent } from './Articles/list-article/list-article.component';

const routes: Routes = [
  { path: "categories", component: ListCategorieComponent},
  { path: "articles", component: ListArticleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MagasinierRoutingModule { }
