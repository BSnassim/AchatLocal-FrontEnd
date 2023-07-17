import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.dev';
import { Utilisateur } from '../models/utilisateur';

const URL = environment.apiURL + "/users";

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refresh$() {
    return this._refresh$;
  }

  getUtilisateurs(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(URL);
  }

  addUtilisateur(Utilisateur: Utilisateur) {
    return this.http.post<Utilisateur>(URL, Utilisateur).pipe(
      tap(() => {
        this._refresh$.next();
      })
    )
  }

  editUtilisateur(Utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(URL, Utilisateur).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  deleteUtilisateur(id: number) {
    return this.http.delete(URL + "/" + id).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

}
