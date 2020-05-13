import { Component, OnInit } from '@angular/core';
import { VkApiService } from './services/vk-api.service';
import { SessionService } from './services/session.service';
import { Session } from './store/interfeces/users.interfaces';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectSessionState } from './store';
import { InitLocationAction } from './store/actions/weathers.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isLogin: boolean;
  public sessionState$: Observable<Session> = this.store.pipe(select(selectSessionState));


  constructor(
    private vkApiService: VkApiService,
    private store: Store
  ) { }

  ngOnInit() {
    this.store.dispatch(new InitLocationAction());
    this.vkApiService.apiInit('vk_api_transport');
    this.sessionState$.subscribe(session => {
      if (session !== undefined) {
        this.isLogin = session.status;
      }
    });
  }

  logout() {
    this.vkApiService.logout();
  }

  public login(): void {
    this.vkApiService.login();
  }

}
