import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.dev';
import { BonDeSortie } from '../models/bon-de-sortie';

const URL = environment.apiURL + "/bonDeSortie";

@Injectable({
  providedIn: 'root'
})
export class BonDeSortieService {
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refresh$() {
    return this._refresh$;
  }

  getBonDeSorties(): Observable<BonDeSortie[]> {
    return this.http.get<BonDeSortie[]>(URL);
  }

  addBonDeSortie(bonDeSortie: BonDeSortie) {
    return this.http.post<BonDeSortie>(URL, bonDeSortie).pipe(
      tap(() => {
        this._refresh$.next();
      })
    )
  }

  editBonDeSortie(bonDeSortie: BonDeSortie): Observable<BonDeSortie> {
    return this.http.put<BonDeSortie>(URL, bonDeSortie).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  deleteBonDeSortie(id: number) {
    return this.http.delete(URL + "/" + id).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

}
