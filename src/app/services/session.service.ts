import { Injectable, Inject, InjectionToken } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';


@Injectable({
    providedIn: 'root'
})

export class SessionService {

    constructor(@Inject(SESSION_STORAGE) private storage: StorageService) { }

    private saveSessionID(val) {
        this.storage.set('id', val);
    }

    private saveSessionStatus(val: boolean): void {
        this.storage.set('isLoggedIn', val);
    }

    public getSessionID() {
        return this.storage.get('id');
    }

    public getSessionStatus(): boolean {
        return this.storage.get('isLoggedIn');
    }

    public createSession(id, status) {
        this.saveSessionID(id);
        this.saveSessionStatus(status);
    }

    public destroySession() {
        this.storage.clear();
    }

    public storeUserProfile(user) {
        this.storage.set('profile', user);
    }

    public storeUserFriendList(friends) {
        this.storage.set('friends', friends);
    }

    public getUserFriendList() {
        return this.storage.get('friends');
    }

    public getUserProfile() {
        return this.storage.get('profile');
    }

}
