import { Component, OnInit } from '@angular/core';
import { Weather, Location } from 'src/app/store/interfeces/weathers.interfaces';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectWeatherState, selectLocationState } from 'src/app/store';

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.scss']
})

export class WeatherComponent implements OnInit {
    public weatherInfo: Weather;
    public weatherState$: Observable<Weather> = this.store.pipe(select(selectWeatherState));
    public locationInfo: Location;
    public locationState$: Observable<Location> = this.store.pipe(select(selectLocationState));

    constructor(private store: Store) { }

    ngOnInit() {
        this.weatherState$.subscribe(weather => {
            this.weatherInfo = weather;
        });

        this.locationState$.subscribe(location => {
            this.locationInfo = location;
        });
    }

}
