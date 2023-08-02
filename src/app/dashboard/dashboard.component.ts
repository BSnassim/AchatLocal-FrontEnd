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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentUser: Utilisateur;

  // Stats pour admin
  adminCount: number;
  adminPercentage: string;
  magasinierCount: number;
  magasinierPercentage: string;
  serviceAchatCount: number;
  serviceAchatPercentage: string;
  userCount: number;
  departmentNames: string[];
  departmentCounts: number[];

  // Stats pour magasinier
  termineCount: number = 0;
  attenteCount: number = 0;
  coursCount: number = 0;
  basicData;
  basicOptions;
  historyA : HistoriqueArticle[] = [];
  timelineEvents: any[] = [];



  constructor(private tokenService: TokenService,
    private utilisateurService: UtilisateurService,
    private departementService: DepartementService,
    private demandeArticleService: DemandeArticleService,
    private demandeAchatService: DemandeAchatService,
    private bonDeSortieService: BonDeSortieService,
    private bonDeCommandeService: BonDeCommandeService,
    private historiqueService: HistoriqueArticleService
  ) {
    this.getUserStats();
    this.getMagasinierStats();
    this.getHistory();
   }

  ngOnInit(): void {
    this.tokenService.getUser().subscribe(user => {
      this.currentUser = user;
    });
   
  }

  getUserStats() {
    this.utilisateurService.getUsersCount().subscribe(count => { this.userCount = count });
    this.utilisateurService.getUsersCountByRole("Administrateur").subscribe(count => {
      this.adminCount = count;
      this.adminPercentage = (count / this.userCount * 100).toFixed(2) + "%";
    });
    this.utilisateurService.getUsersCountByRole("Magasinier").subscribe(count => {
      this.magasinierCount = count;
      this.magasinierPercentage = (count / this.userCount * 100).toFixed(2) + "%";
    });
    this.utilisateurService.getUsersCountByRole("Service achat").subscribe(count => {
      this.serviceAchatCount = count;
      this.serviceAchatPercentage = (count / this.userCount * 100).toFixed(2) + "%";
    });

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
        labels: ['En attente', 'En cours de traitement', 'Terminé'],
        datasets: [
          {
            label: 'Demandes',
            data: [this.attenteCount, this.coursCount, this.termineCount],
            backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
            borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
            borderWidth: 1
          }
        ]
      };
    })
  }

  getHistory() {
    this.historiqueService.getHistorique().subscribe( h => {
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


}
