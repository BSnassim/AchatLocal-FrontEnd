import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MessageService, ConfirmationService } from 'primeng/api';
import { BonDeSortieService } from 'src/app/Services/bon-de-sortie.service';
import { AppBreadcrumbService } from 'src/app/main/app-breadcrumb/app.breadcrumb.service';
import { BonDeSortie } from 'src/app/models/bon-de-sortie';

@Component({
  selector: 'app-list-bon-de-sortie',
  templateUrl: './list-bon-de-sortie.component.html',
  styleUrls: ['./list-bon-de-sortie.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ListBonDeSortieComponent implements OnInit {
 
  bonSortieList: BonDeSortie[];

  cols: any[];

  constructor(
    private breadcrumbService: AppBreadcrumbService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private bonDeSortieService: BonDeSortieService,
    private router: Router
  ) {
    this.breadcrumbService.setItems([
      {
        label: "Liste des bons de sortie",
        routerLink: ["demande/Liste-des-bons-de-sortie"]
      }
    ])
  }

  ngOnInit(): void {
    this.cols = [
      { field: 'demandeArticle.article.libelle', header: 'Article' },
      { field: 'demandeArticle.demandeur', header: 'Demandeur' },
      { field: 'magasinier', header: 'Magasinier' },
      { field: 'demandeArticle.quantite', header: 'Quantite' },
      { field: 'dateSortie', header: 'DateSortie' },
    ];

    this.bonDeSortieService.getBonDeSorties().subscribe((data) => {
      this.bonSortieList = data;
    });
  }

  downloadPDF(bon : BonDeSortie): void {
    let pdf = new jsPDF();
    autoTable(pdf, {
      head: [[
        'Date de sortie',
        'Département',
        'Magasinier',
        'Article',
        'Quantité']],
      body: [
        [
          bon.dateSortie.toString(), 
          bon.demandeArticle.demandeur.departement.nom,
          bon.magasinier.nom+" "+bon.magasinier.prenom,
          bon.demandeArticle.article.libelle,
          bon.demandeArticle.quantite
        ]
      ],
    });

    pdf.save('Bon de sortie - '+bon.id+' - '+bon.dateSortie+'.pdf')
  }

}
