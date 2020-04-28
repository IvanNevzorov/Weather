import { WeathersService } from './services/weathers.service';
import { LocationService } from './services/location.service';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private location: LocationService, private weathers: WeathersService) {}

  getLocation() {
    this.location.getLovation().subscribe(data => console.log(data));
  }

  getWeatherOne() {
    this.weathers.getWeatherStack()
    .subscribe(data => console.log(data));
  }

  getWeatherTwo() {
    this.weathers.getOpenWeatherMap()
    .subscribe(data => console.log(data));
  }

}
