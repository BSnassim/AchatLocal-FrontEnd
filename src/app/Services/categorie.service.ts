import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.dev';
import { Categorie } from '../models/categorie';

const URL = environment.apiURL + "/categorie";
@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refresh$() {
    return this._refresh$;
  }

  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(URL);
  }

  getCategoriesByType(type: string): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(URL+"/ByType/"+type);
  }

  addCategorie(categorie: Categorie) {
    return this.http.post<Categorie>(URL, categorie).pipe(
      tap(() => {
        this._refresh$.next();
      })
    )
  }

  editCategorie(categorie: Categorie): Observable<Categorie> {
    return this.http.put<Categorie>(URL, categorie).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  deleteCategorie(id: number) {
    return this.http.delete(URL + "/" + id).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

}
