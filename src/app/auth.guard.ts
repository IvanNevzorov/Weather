import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Session } from './store/interfeces/users.interfaces';
import { Store, select } from '@ngrx/store';
import { selectSessionState } from './store';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {
    public isLogin: boolean;
    public sessionState$: Observable<Session> = this.store.pipe(select(selectSessionState));
    public subscriber: Subscription;

    constructor(private store: Store, private router: Router) {
        this.subscriber = this.sessionState$.subscribe(session => {
            this.isLogin = session.status;
        });
    }



    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (!this.isLogin) {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }
}
