import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.dev';
import {HttpClient} from '@angular/common/http';
import {LoginUser} from '../../models/LoginUser';
import {Observable} from 'rxjs';
import {TokenService} from './token.service';
import {Router} from '@angular/router';
import { CryptojsService } from 'src/app/Services/cryptojs.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    baseUrl = environment.apiURL;
    constructor(
        private http: HttpClient,
        private tokenService: TokenService,
        private router: Router,
        private encrypter: CryptojsService,
        private permissionService: NgxPermissionsService
    ) {}

    savePermissions(role: string) {
        let r = role;
        let res = this.encrypter.encrypt(r);
        sessionStorage.setItem("permissions", res);
    }
    getPermissions() {
        let perms = this.encrypter.decrypt(
            sessionStorage.getItem("permissions")
        );
        let res : string[] = [perms];
        return res;
    }
    login(u: LoginUser): Observable<any> {
        return this.http.post(this.baseUrl + "/authenticate", u);
    }
    logout() {
        this.tokenService.removeToken();
        sessionStorage.removeItem("permissions");
        this.permissionService.flushPermissions();
        this.router.navigate(["/login"]);
        window.location.reload();
    }
}
