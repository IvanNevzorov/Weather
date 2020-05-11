import { Component, OnInit } from '@angular/core';
import { Weather, Location, WeatherCapital, Capitals } from 'src/app/store/interfeces/weathers.interfaces';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectWeatherState, selectLocationState, selectCapitalsState } from 'src/app/store';
import { GetCapitalsAction } from 'src/app/store/actions/weathers.action';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})

export class WeatherComponent implements OnInit {
  public capitalsNames: Location[] = [
    { country: 'France', city: 'Paris', point: { lng: 2.3514, lat: 48.8566 }},
    { country: 'Russia', city: 'Moscow', point: { lng: 37.6174, lat: 55.7504 }},
    { country: 'United Kingdom', city: 'London', point: { lng: -0.1276, lat: 51.5073 }},
    { country: 'Germany', city: 'Berlin', point: { lng: 13.3888, lat: 52.5170 }},
    { country: 'Czech Republic', city: 'Prague', point: { lng: 14.4212, lat: 50.0874 }},
  ];
  public weatherInfo: Weather;
  public capitalsInfo: WeatherCapital[] = [];
  public locationInfo: Location;
  public weatherState$: Observable<Weather> = this.store.pipe(select(selectWeatherState));
  public locationState$: Observable<Location> = this.store.pipe(select(selectLocationState));
  public capitalsState$: Observable<Capitals> = this.store.pipe(select(selectCapitalsState));

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.capitalsNames.forEach(item => this.store.dispatch(new GetCapitalsAction(item)));

    this.capitalsState$.subscribe(capitalsState => {
      for (const capitalName in capitalsState) {
        if (!this.capitalsInfo.find(item => item.capital === capitalName)) {
          this.capitalsInfo.push(capitalsState[capitalName]);
        }
      }
    });


    this.weatherState$.subscribe(weather => {
      this.weatherInfo = weather;
    });

    this.locationState$.subscribe(location => {
      this.locationInfo = location;
    });
  }

}
