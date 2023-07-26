import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { HistoriqueArticle } from '../models/historique-article';

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

}
