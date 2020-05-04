import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { WeatherStackLoad, OpenWeatherMapLoad, GetLocation, InitLocation } from './store/actions/weathers.action';
import { selectWeatherStackState, selectOpenWeatherMapState, selectResourceState, selectLocationState } from './store';
import { Weather, Location } from './store/models/weathers.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public locationInfo: Location;
  public weatherStackInfo: Weather;
  public openWeatherMapInfo: Weather;
  public wetherChoise: string;

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new InitLocation());
    this.store.pipe(select(selectLocationState)).subscribe(data => this.locationInfo = data);
  }

  templateWeater(resource) {
    if (resource === "weatherStack") {
      this.store.dispatch(new WeatherStackLoad(this.locationInfo));
      this.store.pipe(select(selectWeatherStackState)).subscribe(data => this.weatherStackInfo = data);
      this.store.pipe(select(selectResourceState)).subscribe(data => this.wetherChoise = data);
    }

    if (resource === "openWeatherMap") {
      this.store.dispatch(new OpenWeatherMapLoad(this.locationInfo));
      this.store.pipe(select(selectOpenWeatherMapState)).subscribe(data => this.openWeatherMapInfo = data);
    }

    // this.store.pipe(select(selectResourceState)).subscribe(data => this.wetherChoise = data);
  }
}
