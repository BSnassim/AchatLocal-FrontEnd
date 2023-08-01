import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemandeRoutingModule } from './demande-routing.module';
import { MesDemandesComponent } from './Demande-Article/mes-demandes/mes-demandes.component';
@NgModule({
  declarations: [  
    MesDemandesComponent
  ],
  imports: [
    CommonModule,
    DemandeRoutingModule
  ]
})
export class DemandeModule { }
