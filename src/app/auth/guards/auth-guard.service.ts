import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private tokenService: TokenService, private router: Router) {
  }

  // @ts-ignore
  // tslint:disable-next-line:max-line-length
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean {
    // let roles = route.data.roles as Array<string>;
  
    if (!this.tokenService.getToken()) {
      // User not authenticated properly
      this.tokenService.removeToken();
      this.router.navigate(['/login']);
      return false;

    } 
    // else if (roles) {
    //   this.tokenService.getRoles()
    // } 
    else {
      return true;
    }
  }
}