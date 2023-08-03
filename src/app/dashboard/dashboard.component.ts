import { Component, OnInit } from '@angular/core';
import { TokenService } from '../auth/services/token.service';
import { Utilisateur } from '../models/utilisateur';
import { UtilisateurService } from '../Services/utilisateur.service';
import { DepartementService } from '../Services/departement.service';
import { DemandeArticleService } from '../Services/demande-article.service';
import { DemandeAchatService } from '../Services/demande-achat.service';
import { BonDeSortieService } from '../Services/bon-de-sortie.service';
import { BonDeCommandeService } from '../Services/bon-de-commande.service';
import { PrimeIcons } from 'primeng/api';
import { HistoriqueArticleService } from '../Services/historique-article.service';
import { HistoriqueArticle } from '../models/historique-article';
import { DemandeArticle } from '../models/demande-article';
import { AppBreadcrumbService } from '../main/app-breadcrumb/app.breadcrumb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentUser: Utilisateur;

  // Stats pour magasinier
  termineCount: number = 0;
  attenteCount: number = 0;
  coursCount: number = 0;
  basicData;
  basicOptions;
  historyA: HistoriqueArticle[] = [];
  timelineEvents: any[] = [];
  demandeArticleCount: number = 0;
  demandeAchatCount: number = 0;
  bonDeCommandeCount: number = 0;
  bonDeSortieCount: number = 0;
  magasinierData;
  serviceData;

  hideA: boolean = false;
  hideB: boolean = true;
  hideC: boolean = true;

  // Pour demandeur
  latestDemande: DemandeArticle;
  events;
  menuCarousel = [
    {
      name: 'Mes demandes',
      image: 'folder',
      link: 'demande/Mes-demandes'
    },
    {
      name: 'Demander un article',
      image: 'guideline',
      link: 'demande/Demander-un-article'
    },
  ];
  carouselResponsiveOptions: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
];


  // Stats pour service achat
  saData;
  saOptions;

  constructor(private tokenService: TokenService,
    private breadCrumbService: AppBreadcrumbService,
    private utilisateurService: UtilisateurService,
    private departementService: DepartementService,
    private router: Router,
    private demandeArticleService: DemandeArticleService,
    private demandeAchatService: DemandeAchatService,
    private bonDeSortieService: BonDeSortieService,
    private bonDeCommandeService: BonDeCommandeService,
    private historiqueService: HistoriqueArticleService
  ) {
    this.breadCrumbService.setItems(
      [{
        label:"Dashboard"
      }]
    )
    this.tokenService.getUser().subscribe(user => {
      this.currentUser = user;
    });
    this.getCounts();
    this.getMagasinierStats();
    this.getHistory();
    this.getSuiviDemande();
  }

  ngOnInit(): void {
  }

  redirect(link:string){
    this.router.navigate([link]);
  }

  show(n: number) {
    switch (n) {
      case 1:
        this.hideA = false;
        this.hideB = true;
        this.hideC = true;
        break;
      case 2:
        this.hideA = true;
        this.hideB = false;
        this.hideC = true;
        break;
      case 3:
        this.hideA = true;
        this.hideB = true;
        this.hideC = false;
        break;
    }
  }

  getCounts() {
    this.demandeArticleService.getDemandeArticleCount().subscribe(c => {
      this.demandeArticleCount = c;
    })
    this.demandeAchatService.getDemandeAchatCount().subscribe(c => {
      this.demandeAchatCount = c;
    })
    this.bonDeCommandeService.getBonDeCommandeCount().subscribe(c => {
      this.bonDeCommandeCount = c;
    })
    this.bonDeSortieService.getBonDeSortieCount().subscribe(c => {
      this.bonDeSortieCount = c;
      this.magasinierData = {
        labels: [''],
        datasets: [
          {
            label: ['Bon de sortie'],
            data: [this.bonDeSortieCount],
            backgroundColor: ['rgba(255, 159, 64, 0.2)'],
            borderColor: ['rgb(255, 159, 64)'],
            borderWidth: 1
          },
          {
            label: ['Bon de commande'],
            data: [this.bonDeCommandeCount],
            backgroundColor: ['rgba(75, 192, 192, 0.2)'],
            borderColor: ['rgb(75, 192, 192)'],
            borderWidth: 1
          },
          {
            label: ["Demande d'achat"],
            data: [this.demandeAchatCount],
            backgroundColor: ['rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgb(54, 162, 235)'],
            borderWidth: 1
          },
        ]
      };
      this.serviceData = {
        labels: [''],
        datasets: [
          {
            label: ['Bon de commande'],
            data: [this.bonDeCommandeCount],
            backgroundColor: ['rgba(75, 192, 192, 0.2)'],
            borderColor: ['rgb(75, 192, 192)'],
            borderWidth: 1
          },
          {
            label: ["Demande d'achat"],
            data: [this.demandeAchatCount],
            backgroundColor: ['rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgb(54, 162, 235)'],
            borderWidth: 1
          },
        ]
      };
    })
  }

  getMagasinierStats() {
    this.demandeArticleService.getCountByEtat("Terminé").subscribe(c => {
      this.termineCount = c;
    })
    this.demandeArticleService.getCountByEtat("En cours du traitement").subscribe(c => {
      this.coursCount = c;
    })
    this.demandeArticleService.getCountByEtat("En attente").subscribe(c => {
      this.attenteCount = c;
      this.basicData = {
        labels: [''],
        datasets: [
          {
            label: 'En attente',
            data: [this.attenteCount],
            backgroundColor: ['rgba(255, 159, 64, 0.2)'],
            borderColor: ['rgb(255, 159, 64)'],
            borderWidth: 1
          },
          {
            label: 'En cours',
            data: [this.coursCount],
            backgroundColor: ['rgba(75, 192, 192, 0.2)'],
            borderColor: ['rgb(75, 192, 192)'],
            borderWidth: 1
          },
          {
            label: 'Terminé',
            data: [this.termineCount],
            backgroundColor: ['rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgb(54, 162, 235)'],
            borderWidth: 1
          }
        ]
      };
    })
  }

  getHistory() {
    this.historiqueService.getHistorique().subscribe(h => {
      this.historyA = h;
      h.forEach(e => {
        if (e.entre > 0) {
          this.timelineEvents.push(
            {
              transaction: e.article.libelle, amount: '+' + e.entre, date: e.dateHistorique,
              icon: PrimeIcons.PLUS, iconColor: '#0BD18A', amountColor: '#00D0DE'
            }
          )
        } else {
          this.timelineEvents.push(
            {
              transaction: e.article.libelle, amount: '-' + e.sortie, date: e.dateHistorique,
              icon: PrimeIcons.MINUS, iconColor: '#FC6161', amountColor: '#FC6161'
            },
          )
        }
      });
    });
  }

  getSuiviDemande() {
    this.tokenService.getUser().subscribe(u => {
      this.demandeArticleService.getLatest(u.id).subscribe(d => {
        this.latestDemande = d;
        switch(d.etat){
          case "En attente":
            this.events = ["En attente"];
            break;
          case "En cours du traitement":
            this.events = ["En attente", "En cours du traitement"];
            break;
          case "Terminé":
            this.events = ["En attente", "En cours du traitement", "Terminé"];
            break;
        }
      });
    })
  }

}
