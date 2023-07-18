import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.dev';
import { Article } from '../models/article';

const URL = environment.apiURL + "/articles";
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refresh$() {
    return this._refresh$;
  }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(URL);
  }

  getArticlesByCategorieId(id:number): Observable<Article[]> {
    return this.http.get<Article[]>(URL+"/categorie/"+id);
  }

  addArticle(Article: Article) {
    return this.http.post<Article>(URL, Article).pipe(
      tap(() => {
        this._refresh$.next();
      })
    )
  }

  editArticle(Article: Article): Observable<Article> {
    return this.http.put<Article>(URL, Article).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  deleteArticle(id: number) {
    return this.http.delete(URL + "/" + id).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

}
