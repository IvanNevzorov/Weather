import { Component, Input } from '@angular/core';
import { Weather } from 'src/app/store/models/weathers.model';

@Component({
    selector: 'app-weatherstack',
    templateUrl: './wetherstack.component.html',
    styleUrls: ['./wetherstack.component.scss']
})

export class WeatherStackComponent {
    @Input() weather: Weather;
    constructor() { }
}