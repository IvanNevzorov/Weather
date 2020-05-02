import { Injectable } from '@angular/core';
import { Weather, Location } from '../store/models/weathers.model';
import * as moment from 'moment/moment';

@Injectable({ providedIn: 'root' })

export class StorageService {
  constructor() { }

  // For WeatherStack

  getWeatherStack() {
    return JSON.parse(localStorage.getItem('WeatherStack'));
  }

  setWeatherStack(weather: Weather) {
    localStorage.setItem('WeatherStack', JSON.stringify(weather));
  }

  getSaveTimeWeatherStack() {
    return localStorage.getItem('SaveTimeWeatherStack');
  }

  setSaveTimeWeatherStack(date: string) {
    localStorage.setItem('SaveTimeWeatherStack', date);
  }

  checkSaveTimeWeatherStack() {
    const timeForCheck = moment();
    const timeDifference = moment.duration(timeForCheck.diff(localStorage.getItem('SaveTimeOpenWeatherMap')));
    if (timeDifference.as('hours') >= 2) return true;
    else return false;
  }

  //For OpenWeatherMap

  getOpenWeatherMap() {
    return JSON.parse(localStorage.getItem('OpenWeatherMap'));
  }

  setOpenWeatherMap(weather: Weather) {
    localStorage.setItem('OpenWeatherMap', JSON.stringify(weather));
  }

  getSaveTimeOpenWeatherMap() {
    return localStorage.getItem('SaveTimeOpenWeatherMap');
  }

  setSaveTimeOpenWeatherMap(date: string) {
    localStorage.setItem('SaveTimeOpenWeatherMap', date);
  }

  checkSaveTimeOpenWeatherMap() {
    const timeForCheck = moment();
    const timeDifference = moment.duration(timeForCheck.diff(localStorage.getItem('SaveTimeOpenWeatherMap')));
    if (timeDifference.as('hours') >= 2) return true;
    else return false;
  }
}
