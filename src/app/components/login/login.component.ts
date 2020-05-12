import { Component, OnInit } from '@angular/core';
import { VkApiService } from 'src/app/services/vk-api.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(private vkApiService: VkApiService) { }

    ngOnInit() {
        this.vkApiService.apiInit();
    }

    login() {
        this.vkApiService.login();
    }
}
