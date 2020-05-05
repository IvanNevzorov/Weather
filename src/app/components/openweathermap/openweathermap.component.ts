import { Component, Input } from '@angular/core';
import { Weather } from 'src/app/store/interfeces/weathers.interfaces';

@Component({
    selector: 'app-openweathermap',
    templateUrl: './openweathermap.component.html',
    styleUrls: ['./openweathermap.component.scss']
})

export class OpenWeatherMapComponent {
    @Input() weather: Weather;
    constructor() { }

}