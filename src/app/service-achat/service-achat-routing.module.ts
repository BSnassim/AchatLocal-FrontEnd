import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeBonDeCommandeComponent } from './bon-de-commande/liste-bon-de-commande/liste-bon-de-commande.component';
import { ListeDemandeAchatComponent } from './demande-achat/liste-demande-achat/liste-demande-achat.component';

const routes: Routes = [
  { path: "Liste-bon-de-commande", component: ListeBonDeCommandeComponent },
  { path: "Liste-demande-achat", component: ListeDemandeAchatComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceAchatRoutingModule { }
