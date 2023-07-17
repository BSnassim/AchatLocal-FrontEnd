import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { Role } from '../models/role';
import { tap } from 'rxjs/operators';

const URL = environment.apiURL + "/roles";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refresh$() {
    return this._refresh$;
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(URL);
  }

  addRole(role: Role) {
    return this.http.post<Role>(URL, role).pipe(
      tap(() =>{
        this._refresh$.next();
      })
    )
  }

  editRole(role: Role): Observable<Role> {
    return this.http.put<Role>(URL, role).pipe(
        tap(() => {
            this._refresh$.next();
        })
    );
}

deleteRole(id: number) {
  return this.http.delete(URL + "/" + id).pipe(
      tap(() => {
          this._refresh$.next();
      })
  );
}

}
