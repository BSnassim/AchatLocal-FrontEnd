import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { DemandeArticle } from '../models/demande-article';
import { tap } from 'rxjs/operators';
import { Byte } from '@angular/compiler/src/util';

const URL = environment.apiURL + "/demandeArticle";

@Injectable({
  providedIn: 'root'
})
export class DemandeArticleService {
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refresh$() {
    return this._refresh$;
  }

  getDemandeArticle(): Observable<DemandeArticle[]> {
    return this.http.get<DemandeArticle[]>(URL);
  }

  getDemandeArticleByUser(id:number): Observable<DemandeArticle[]> {
    return this.http.get<DemandeArticle[]>(URL+"/byDemandeur/"+id);
  }

  getDemandeArticlePDF(id:number): Observable<any> {
    return this.http.get(URL+"/pdf/"+id, { responseType: 'arraybuffer' });
  }

  getDemandeArticleById(id:number): Observable<DemandeArticle>{
    return this.http.get<DemandeArticle>(URL+"/"+id);
  }

  addDemandeArticle(demandeArticle: DemandeArticle) {
    return this.http.post<DemandeArticle>(URL, demandeArticle).pipe(
      tap(() => {
        this._refresh$.next();
      })
    )
  }

  editDemandeArticle(demandeArticle: DemandeArticle): Observable<DemandeArticle> {
    return this.http.put<DemandeArticle>(URL, demandeArticle).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  deleteDemandeArticle(id: number) {
    return this.http.delete(URL + "/" + id).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  getCountByEtat(etat: string): Observable<number>{
    return this.http.get<number>(URL+"/count/etat/"+etat);
  }

}
