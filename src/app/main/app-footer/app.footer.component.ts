import {Component} from '@angular/core';
import {AppComponent} from '../../app.component';

@Component({
    selector: 'app-footer',
    template: `
        <div class="layout-footer">
            <div class="footer-logo-container">
                <img id="footer-logo"   [src]="'assets/layout/images/logo-'+ (app.colorScheme === 'light' ? 'dark' : 'light') + '.png'" alt="atlantis-layout"/>
                <span class="app-name"></span>
            </div>
            <span class="copyright">&#169; RNTA - 2023</span>
        </div>
    `
})
export class AppFooterComponent {
    constructor(public app: AppComponent) {}
}
