import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { BonDeCommandeService } from 'src/app/Services/bon-de-commande.service';
import { AppBreadcrumbService } from 'src/app/main/app-breadcrumb/app.breadcrumb.service';
import { BonDeCommande } from 'src/app/models/bon-de-commande';

@Component({
  selector: 'app-liste-bon-de-commande',
  templateUrl: './liste-bon-de-commande.component.html',
  styleUrls: ['./liste-bon-de-commande.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ListeBonDeCommandeComponent implements OnInit {

  bonCommandeList: BonDeCommande[];

  cols: any[];

  constructor(
    private breadcrumbService: AppBreadcrumbService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private bonDeCommandeService: BonDeCommandeService,
    private router: Router
  ) {
    this.breadcrumbService.setItems([
      {
        label: "Liste des bons de Commande",
        routerLink: ["demande/Liste-des-bons-de-Commande"]
      }
    ])
  }

  ngOnInit(): void {
    this.cols = [
      { field: 'demandeArticle.article.libelle', header: 'Article' },
      { field: 'demandeArticle.demandeur', header: 'Demandeur' },
      { field: 'magasinier', header: 'Magasinier' },
      { field: 'demandeArticle.quantite', header: 'Quantite' },
      { field: 'dateCommande', header: 'DateCommande' },
    ];

    this.bonDeCommandeService.getBonDeCommandes().subscribe((data) => {
      this.bonCommandeList = data;
    });
  }

}
