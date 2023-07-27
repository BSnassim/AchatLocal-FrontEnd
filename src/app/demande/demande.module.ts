import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemandeRoutingModule } from './demande-routing.module';
import { DemandeToPrintComponent } from './Demande-Article/demande-to-print/demande-to-print.component';

@NgModule({
  declarations: [  ],
  imports: [
    CommonModule,
    DemandeRoutingModule
  ]
})
export class DemandeModule { }
