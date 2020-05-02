import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Location } from 'src/app/store/models/weathers.model';
import { Store } from '@ngrx/store';
import { WeatherStackLoad, OpenWeatherMapLoad } from 'src/app/store/actions/weathers.action';

@Component({
    selector: 'app-select-weather',
    templateUrl: './select-weather.component.html',
    styleUrls: ['./select-weather.component.scss']
})

export class SelectWeatherComponent {
    @Input() location: Location;

    constructor(private store: Store) { }

    getWeatherStack() {
        this.store.dispatch(new WeatherStackLoad(this.location.city))
    }

    getOpenWeatherMap() {
        this.store.dispatch(new OpenWeatherMapLoad(this.location.city))
    }

}