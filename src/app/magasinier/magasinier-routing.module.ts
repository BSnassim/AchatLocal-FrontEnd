import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCategorieComponent } from './Categories/list-categorie/list-categorie.component';
import { ListArticleComponent } from './Articles/list-article/list-article.component';
import { HistoriqueArticleComponent } from './Articles/historique-article/historique-article.component';

const routes: Routes = [
  { path: "categories", component: ListCategorieComponent},
  { path: "articles", component: ListArticleComponent},
  { path: "historique-article", component: HistoriqueArticleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MagasinierRoutingModule { }
