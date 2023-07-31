import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.dev';
import { DemandeAchat } from '../models/demande-achat';

const URL = environment.apiURL + "/demandeAchat";

@Injectable({
  providedIn: 'root'
})
export class DemandeAchatService {
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refresh$() {
    return this._refresh$;
  }

  getDemandeAchat(): Observable<DemandeAchat[]> {
    return this.http.get<DemandeAchat[]>(URL);
  }

  getDemandeAchatPDF(id:number): Observable<any> {
    return this.http.get(URL+"/pdf/"+id, { responseType: 'arraybuffer' });
  }

  addDemandeAchat(demandeAchat: DemandeAchat) {
    return this.http.post<DemandeAchat>(URL, demandeAchat).pipe(
      tap(() => {
        this._refresh$.next();
      })
    )
  }

  editDemandeAchat(demandeAchat: DemandeAchat): Observable<DemandeAchat> {
    return this.http.put<DemandeAchat>(URL, demandeAchat).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  deleteDemandeAchat(id: number) {
    return this.http.delete(URL + "/" + id).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

}
