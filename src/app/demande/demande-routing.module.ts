import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDemandeArticleComponent } from './Demande-Article/list-demande-article/list-demande-article.component';
import { FormDemandeArticleComponent } from './Demande-Article/form-demande-article/form-demande-article.component';
import { DetailDemandeArticleComponent } from './Demande-Article/detail-demande-article/detail-demande-article.component';
import { ListBonDeSortieComponent } from './Bon-De-Sortie/list-bon-de-sortie/list-bon-de-sortie.component';

const routes: Routes = [
  { path: "Liste-des-demandes", component: ListDemandeArticleComponent },
  { path: "Demander-un-article", component: FormDemandeArticleComponent },
  { path: "Details-demande", component: DetailDemandeArticleComponent },
  { path: "Liste-des-bons-de-sortie", component: ListBonDeSortieComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemandeRoutingModule { }
