import { Injectable } from '@angular/core';
import { Weather, Location } from '../store/models/wheathers.model';

@Injectable({ providedIn: 'root' })

export class StorageService {
  constructor() { }

  getloction() {
    return JSON.parse(localStorage.getItem('WeatherLocation'));
  }

  setLocation(location: Location) {
    localStorage.setItem('WeatherLocation', JSON.stringify(location));
  }

  getWeatherStack() {
    return JSON.parse(localStorage.getItem('WeatherStack'));
  }

  setWeatherStack(weather: Weather) {
    localStorage.setItem('WeatherStack', JSON.stringify(weather));
  }

  getOpenWeatherMap() {
    return JSON.parse(localStorage.getItem('OpenWeatherMap'));
  }

  setOpenWeatherMap(weather: Weather) {
    localStorage.setItem('OpenWeatherMap', JSON.stringify(weather));
  }
}
