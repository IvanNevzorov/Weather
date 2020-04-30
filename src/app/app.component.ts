import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { GetLocation, WeatherStackLoad, OpenWeatherMapLoad } from './store/actions/weathers.action';
import { selectLocationState, selectWeatherStackState, selectOpenWeatherMapState } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private store: Store) { }


  getLocation() {
    this.store.dispatch(new GetLocation())
    this.store.pipe(select(selectLocationState)).subscribe(data => console.log(data))
  }

  getWeatherOne() {
    this.store.dispatch(new WeatherStackLoad())
    this.store.pipe(select(selectWeatherStackState)).subscribe(data => console.log(data))
  }

  getWeatherTwo() {
    this.store.dispatch(new OpenWeatherMapLoad())
    this.store.pipe(select(selectOpenWeatherMapState)).subscribe(data => console.log(data))
  }

}
