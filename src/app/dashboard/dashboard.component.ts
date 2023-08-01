import { Component, OnInit } from '@angular/core';
import { TokenService } from '../auth/services/token.service';
import { Utilisateur } from '../models/utilisateur';
import { UtilisateurService } from '../Services/utilisateur.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentUser: Utilisateur;

  // User statistics variables
  adminCount: number;
  adminPercentage: string;
  magasinierCount: number;
  magasinierPercentage: string;
  serviceAchatCount: number;
  serviceAchatPercentage: string;
  userCount: number;
  data;
  options;


  constructor(private tokenService: TokenService,
    private utilisateurService: UtilisateurService,
  ) { }

  ngOnInit(): void {
    this.tokenService.getUser().subscribe(user => {
      this.currentUser = user;
    });
    this.getUserStats();

    this.data = {
      labels: ['A', 'B', 'C'],
      datasets: [
          {
              data: [300, 50, 100],
              backgroundColor: ["blue", "yellow", "green"],
              hoverBackgroundColor: ["blue", "yellow", "green"]
          }
      ]
  };


  this.options = {
      cutout: '60%',
      plugins: {
          legend: {
              labels: {
                  color: "black"
              }
          }
      }
  };
  }

  getUserStats() {
    this.utilisateurService.getUsersCount().subscribe(count => { this.userCount = count });
    this.utilisateurService.getUsersCountByRole("Administrateur").subscribe(count => { 
      this.adminCount = count;
      this.adminPercentage = (count/this.userCount * 100).toFixed(2) + "%";
     });
    this.utilisateurService.getUsersCountByRole("Magasinier").subscribe(count => { 
      this.magasinierCount = count;
      this.magasinierPercentage = (count/this.userCount * 100).toFixed(2) + "%";
     });
    this.utilisateurService.getUsersCountByRole("Service achat").subscribe(count => { 
      this.serviceAchatCount = count;
      this.serviceAchatPercentage = (count/this.userCount * 100).toFixed(2) + "%";
     });
  }

}
