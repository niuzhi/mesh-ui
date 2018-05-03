import { Component, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ApplicationStateService } from './state/providers/application-state.service';
import { ApplicationStateDevtools } from './state/providers/application-state-devtools';

@Component({
    selector: 'mesh-app',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['app.component.scss'],
    templateUrl: './app.component.html'
})
export class AppComponent {
    loggedIn$: Observable<boolean>;
    adminMode$: Observable<boolean>;

    constructor(public state: ApplicationStateService,
                devtools: ApplicationStateDevtools,
                private router: Router) {

        this.loggedIn$ = state.select(_state => _state.auth.loggedIn);
        this.adminMode$ = this.router.events
            .filter(event => event instanceof NavigationEnd)
            .map((event: NavigationEnd) => /^\/admin/.test(event.url));
    }
}
