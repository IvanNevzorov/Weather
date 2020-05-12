import { Component, OnInit } from '@angular/core';
import { VkApiService } from './services/vk-api.service';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private vkApiService: VkApiService,
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    this.vkApiService.apiInit();
  }

  logout() {
    this.vkApiService.logout();
  }

  public login(): void {
    this.vkApiService.login();
}

}
