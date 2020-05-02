import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { GetLocation, WeatherStackLoad, OpenWeatherMapLoad } from './store/actions/weathers.action';
import { selectLocationState, selectWeatherStackState, selectOpenWeatherMapState, selectResourceState } from './store';
import { Weather, Location } from './store/models/weathers.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public locationInformation: Location;
  public weatherStackInformation: Weather;
  public openWeatherMapInformation: Weather;
  public wetherChoise: string;

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new GetLocation())
    this.store.pipe(select(selectLocationState)).subscribe(data => this.locationInformation = data);
    this.store.pipe(select(selectResourceState)).subscribe(data => this.wetherChoise = data);
    this.store.pipe(select(selectWeatherStackState)).subscribe(data => this.weatherStackInformation = data);
    this.store.pipe(select(selectOpenWeatherMapState)).subscribe(data => this.openWeatherMapInformation = data)
  }
}
