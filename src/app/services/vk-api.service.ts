import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './session.service';
import { Profile } from '../store/models/profile.model';

declare let VK: any;

@Injectable({ providedIn: 'root' })
export class VkApiService {
    constructor(
        private router: Router,
        private zone: NgZone,
        private sessionService: SessionService
    ) { }

    public apiInit(): void {
        (window as any).vkAsyncInit = function () {
            VK.init({
                apiId: '7461675'
            });
        };
        (function (id) {
            const element = document.createElement('script');
            element.type = 'text/javascript';
            element.src = 'https://vk.com/js/api/openapi.js?168';
            element.async = true;
            document.getElementById(id).appendChild(element);
        }('vk_api_transport'));
    }

    public getProfile() {
        this.zone.run(() => {
            const profileReq = {
                user_id: this.sessionService.getSessionID(),
                fields: 'photo_100,city,interests',
                v: '5.73'
            };
            VK.Api.call('users.get', profileReq, r => {
                if (r.response) {
                    if (this.sessionService.getUserProfile() === undefined) {
                        const element = document.createElement('p');
                        element.className = 'text-secondary';
                        element.textContent = `Добро пожаловать ${r.response[0].first_name} ${r.response[0].last_name}`;
                        document.getElementById('profile').appendChild(element);
                    }
                    this.sessionService.storeUserProfile(
                        new Profile({
                            firstName: r.response[0].first_name,
                            lastName: r.response[0].last_name,
                            city: r.response[0].city ? r.response[0].city.title : 'предпочитает не указывать',
                            photoUrl: r.response[0].photo_100,
                            interests: r.response[0].interests || 'предпочитает не делиться'
                        })
                    );
                }
            });
        });
    }

    public login() {
        this.zone.run(() => {
            VK.Auth.login((response) => {
                if (response.session) {
                    this.sessionService.createSession(response.session.user.id, true);
                    this.getProfile();
                    this.router.navigate(['profile']);
                    console.log('Logged in and authenticated!');
                } else {
                    console.log('Not authenticated!');
                }
            }, VK.access.FRIENDS);
        });
    }

    public logout() {
        VK.Auth.logout();
        this.sessionService.destroySession();
        this.router.navigate(['login']);
    }
}