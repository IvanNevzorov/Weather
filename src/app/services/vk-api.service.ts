import { Injectable, NgZone } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AddSessionAction, AddUserAction } from '../store/actions/weathers.action';
import { SerializeService } from './serialize.service';
import { Observable } from 'rxjs';
import { Session, UserAPI } from '../store/interfeces/users.interfaces';
import { selectSessionState } from 'src/app/store';
import { Router } from '@angular/router';

declare let VK: any;

@Injectable({ providedIn: 'root' })
export class VkApiService {
    public sessionState$: Observable<Session> = this.store.pipe(select(selectSessionState));

    constructor(
        private store: Store,
        private serializeService: SerializeService,
        private router: Router
    ) { }

    private initScriptElement(id: string): void {
        const element = document.createElement('script');
        element.type = 'text/javascript';
        element.src = 'https://vk.com/js/api/openapi.js?168';
        element.async = true;
        document.getElementById(id).appendChild(element);
    }

    public apiInit(id: string): void {
        (window as any).vkAsyncInit = function () {
            VK.init({
                apiId: '7461675',
            });
        };
        this.initScriptElement(id);
    }

    public getProfile(): void {
        let id;
        this.sessionState$.subscribe(session => id = session.id);

        const method = 'users.get';
        const methodParoms = {
            user_id: id,
            fields: 'photo_100,city,interests',
            v: '5.73'
        };

        VK.Api.call(method, methodParoms, (data: UserAPI) => {
            if (data.response) {
                const user = this.serializeService.userAPI(data);
                this.store.dispatch(new AddUserAction(user));
            }
        });
    }

    public login(): void {
        VK.Auth.login((response) => {
            if (response.session) {
                this.store.dispatch(new AddSessionAction({ id: response.session.user.id, status: true }));
                this.getProfile();
            } else {
                console.log('Not authenticated!');
            }
        }, VK.access.FRIENDS);
    }

    public logout() {
        VK.Auth.logout();
        this.store.dispatch(new AddSessionAction({ id: NaN, status: false }));
        this.router.navigate(['./']);
    }
}
