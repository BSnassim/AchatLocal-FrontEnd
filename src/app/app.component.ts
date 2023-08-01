import {Component, OnInit} from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from './auth/services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

    menuMode = 'sidebar';

    layout = 'blue';

    theme = 'blue';

    ripple: boolean;

    colorScheme = 'dark';

    constructor(private primengConfig: PrimeNGConfig,
        private authService: AuthService,
        private permissionsService: NgxPermissionsService) {
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.ripple = true;
        this.permissionsService.loadPermissions(
            this.authService.getPermissions()
        );
    }
}
