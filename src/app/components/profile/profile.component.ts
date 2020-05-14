import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/store/interfeces/users.interfaces';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectUserState } from 'src/app/store';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
    public userInfo: User;
    public userState$: Observable<User> = this.store.pipe(select(selectUserState));

    constructor(private store: Store) { }

    ngOnInit() {
        this.userState$.subscribe(user => this.userInfo = user);
    }
}
