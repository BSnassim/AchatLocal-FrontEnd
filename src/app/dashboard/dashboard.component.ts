import { Component, OnInit } from '@angular/core';
import { TokenService } from '../auth/services/token.service';
import { Utilisateur } from '../models/utilisateur';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentUser: Utilisateur;

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    this.tokenService.getUser().subscribe( user => {
      this.currentUser = user;
    });
    
  }

}
