import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.dev';
import { Departement } from '../models/departement';

const URL = environment.apiURL + "/departements";

@Injectable({
  providedIn: 'root'
})
export class DepartementService {
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refresh$() {
    return this._refresh$;
  }

  getDepartements(): Observable<Departement[]> {
    return this.http.get<Departement[]>(URL);
  }

  addDepartement(departement: Departement) {
    return this.http.post<Departement>(URL, departement).pipe(
      tap(() =>{
        this._refresh$.next();
      })
    )
  }

  editDepartement(departement: Departement): Observable<Departement> {
    return this.http.put<Departement>(URL, departement).pipe(
        tap(() => {
            this._refresh$.next();
        })
    );
}

deleteDepartement(id: number) {
  return this.http.delete(URL + "/" + id).pipe(
      tap(() => {
          this._refresh$.next();
      })
  );
}

}
