import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.dev';
import { BonDeCommande } from '../models/bon-de-commande';

const URL = environment.apiURL + "/bonDeCommande";

@Injectable({
  providedIn: 'root'
})
export class BonDeCommandeService {

  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refresh$() {
    return this._refresh$;
  }

  getBonDeCommandeCount(): Observable<number>{
    return this.http.get<number>(URL+"/count");
  }

  getBonDeCommandes(): Observable<BonDeCommande[]> {
    return this.http.get<BonDeCommande[]>(URL);
  }

  getBonDeCommandePDF(id:number): Observable<any> {
    return this.http.get(URL+"/pdf/"+id, { responseType: 'arraybuffer' });
  }

  addBonDeCommande(bonDeCommande: BonDeCommande) {
    return this.http.post<BonDeCommande>(URL, bonDeCommande).pipe(
      tap(() => {
        this._refresh$.next();
      })
    )
  }

  editBonDeCommande(bonDeCommande: BonDeCommande): Observable<BonDeCommande> {
    return this.http.put<BonDeCommande>(URL, bonDeCommande).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  deleteBonDeCommande(id: number) {
    return this.http.delete(URL + "/" + id).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

}
