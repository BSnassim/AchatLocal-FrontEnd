import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDemandeArticleComponent } from './Demande-Article/list-demande-article/list-demande-article.component';
import { FormDemandeArticleComponent } from './Demande-Article/form-demande-article/form-demande-article.component';
import { DetailDemandeArticleComponent } from './Demande-Article/detail-demande-article/detail-demande-article.component';

const routes: Routes = [
  { path:"Liste-des-demandes", component:ListDemandeArticleComponent},
  { path:"Demander-un-article", component:FormDemandeArticleComponent},
  { path:"Details-demande", component:DetailDemandeArticleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemandeRoutingModule { }
