import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DemandeAchatService } from 'src/app/Services/demande-achat.service';
import { AppBreadcrumbService } from 'src/app/main/app-breadcrumb/app.breadcrumb.service';
import { DemandeAchat } from 'src/app/models/demande-achat';

@Component({
  selector: 'app-liste-demande-achat',
  templateUrl: './liste-demande-achat.component.html',
  styleUrls: ['./liste-demande-achat.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ListeDemandeAchatComponent implements OnInit {

  demandeAchatList: DemandeAchat[];

  cols: any[];

  constructor(
    private breadcrumbService: AppBreadcrumbService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private demandeAchatService: DemandeAchatService,
    private router: Router
  ) {
    this.breadcrumbService.setItems([
      {
        label: "Liste des demandes d'achat",
        routerLink: ["demande/Liste-demande-achat"]
      }
    ])
  }

  ngOnInit(): void {
    this.cols = [
      { field: 'article.libelle', header: 'Article' },
      { field: 'magasinier', header: 'Magasinier' },
      { field: 'quantite', header: 'Quantite' },
      { field: 'dateAchat', header: 'DateAchat' },
    ];

    this.demandeAchatService.getDemandeAchat().subscribe((data) => {
      this.demandeAchatList = data;
    });
  }

}
