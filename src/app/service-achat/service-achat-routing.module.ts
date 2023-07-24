import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeBonDeCommandeComponent } from './bon-de-commande/liste-bon-de-commande/liste-bon-de-commande.component';
import { ListeDemandeAchatComponent } from './demande-achat/liste-demande-achat/liste-demande-achat.component';
import { FormBonDeCommandeComponent } from './bon-de-commande/form-bon-de-commande/form-bon-de-commande.component';
import { FormDemandeAchatComponent } from './demande-achat/form-demande-achat/form-demande-achat.component';

const routes: Routes = [
  { path: "Liste-bon-de-commande", component: ListeBonDeCommandeComponent },
  { path: "Liste-demande-achat", component: ListeDemandeAchatComponent },
  { path: "Formulaire-bon-de-commande", component: FormBonDeCommandeComponent},
  { path: "Formulaire-demande-achat", component: FormDemandeAchatComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceAchatRoutingModule { }
