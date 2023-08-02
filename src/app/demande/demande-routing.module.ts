import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDemandeArticleComponent } from './Demande-Article/list-demande-article/list-demande-article.component';
import { FormDemandeArticleComponent } from './Demande-Article/form-demande-article/form-demande-article.component';
import { DetailDemandeArticleComponent } from './Demande-Article/detail-demande-article/detail-demande-article.component';
import { ListBonDeSortieComponent } from './Bon-De-Sortie/list-bon-de-sortie/list-bon-de-sortie.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { MesDemandesComponent } from './Demande-Article/mes-demandes/mes-demandes.component';

const routes: Routes = [
  {
    path: "Liste-des-demandes", component: ListDemandeArticleComponent,
    canActivate: [NgxPermissionsGuard], data: { permissions: { only: ['Magasinier', 'Administrateur'] } }
  },
  { path: "Demander-un-article", component: FormDemandeArticleComponent },
  { path: "Mes-demandes", component: MesDemandesComponent },
  {
    path: "Details-demande", component: DetailDemandeArticleComponent,
    canActivate: [NgxPermissionsGuard], data: { permissions: { only: ['Magasinier', 'Administrateur'] } }
  },
  {
    path: "Liste-des-bons-de-sortie", component: ListBonDeSortieComponent,
    canActivate: [NgxPermissionsGuard], data: { permissions: { only: ['Magasinier', 'Administrateur'] } }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemandeRoutingModule { }
