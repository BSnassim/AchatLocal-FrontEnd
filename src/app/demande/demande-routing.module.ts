import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDemandeArticleComponent } from './Demande-Article/list-demande-article/list-demande-article.component';

const routes: Routes = [
  { path:"Demandes-Article", component:ListDemandeArticleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemandeRoutingModule { }
