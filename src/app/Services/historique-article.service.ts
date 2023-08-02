import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { HistoriqueArticle } from '../models/historique-article';
import { tap } from 'rxjs/operators';

const URL = environment.apiURL + "/historiqueArticle";

@Injectable({
  providedIn: 'root'
})
export class HistoriqueArticleService {
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refresh$() {
    return this._refresh$;
  }

  getHistoriqueByArticle(id:number): Observable<HistoriqueArticle[]> {
    return this.http.get<HistoriqueArticle[]>(URL+"/article/"+id);
  }

  getHistorique():Observable<HistoriqueArticle[]> {
    return this.http.get<HistoriqueArticle[]>(URL).pipe(
      tap(() =>{
        this._refresh$.next();
      })
    );
  }
  

  addHistoriqueArticle(HistoriqueArticle: HistoriqueArticle) {
    return this.http.post<HistoriqueArticle>(URL, HistoriqueArticle).pipe(
      tap(() =>{
        this._refresh$.next();
      })
    )
  }

}
