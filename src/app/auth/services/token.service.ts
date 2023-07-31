import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.dev';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/models/utilisateur';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
    baseUrl = environment.apiURL + "/authenticate";
    url = environment.apiURL;

    constructor(private http: HttpClient, private router: Router) {}
    getToken() {
        return sessionStorage.getItem("access token");
    }
    setToken(token: string) {
        sessionStorage.setItem("access token", token);
    }
    removeToken() {
        sessionStorage.removeItem("access token");
    }

    // Used to get the user details using his token
    getUser(): Observable<Utilisateur> {
        return this.http.get<Utilisateur>(
            this.url + "/getUserByToken/" + this.getToken()
        );
    }

    // Used to check if string matches encoded password
    checkPassword(rawPassword: string, encodedPassword: string) {
        return this.http.get(this.baseUrl + "/checkPassword", {
            params: {
                rawPassword: rawPassword,
                encodedPassword: encodedPassword,
            },
        });
    }
}
