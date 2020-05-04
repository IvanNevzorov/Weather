import { Injectable } from '@angular/core';
import { Weather } from '../store/models/weathers.model';
import * as moment from 'moment/moment';

@Injectable({ providedIn: 'root' })

export class StorageService {
  constructor() { }

  // For WeatherStack
  getWeatherStack(city) {
    return JSON.parse(localStorage.getItem(`WeatherStack - ${city}`));
  }

  setWeatherStack(weather: Weather, city: string) {
    localStorage.setItem(`WeatherStack - ${city}`, JSON.stringify(weather));
  }

  getSaveTimeWeatherStack(city) {
    return localStorage.getItem(`SaveTimeWeatherStack - ${city}`);
  }

  setSaveTimeWeatherStack(date: string, city) {
    localStorage.setItem(`SaveTimeWeatherStack - ${city}`, date);
  }

  checkSaveTimeWeatherStack(city) {
    if (!this.getSaveTimeWeatherStack(city) && !this.getWeatherStack(city)) return false;
    const timeForCheck = moment();
    const timeDifference = moment.duration(timeForCheck.diff(localStorage.getItem('SaveTimeOpenWeatherMap')));
    if (timeDifference.as('hours') >= 2) return true;
    else return false;
  }

  //For OpenWeatherMap  
  getOpenWeatherMap(city) {
    return JSON.parse(localStorage.getItem(`OpenWeatherMap - ${city}`));
  }

  setOpenWeatherMap(weather: Weather, city: string) {
    localStorage.setItem(`OpenWeatherMap - ${city}`, JSON.stringify(weather));
  }

  getSaveTimeOpenWeatherMap(city) {
    return localStorage.getItem(`SaveTimeOpenWeatherMap - ${city}`);
  }

  setSaveTimeOpenWeatherMap(date: string, city) {
    localStorage.setItem(`SaveTimeOpenWeatherMap - ${city}`, date);
  }

  checkSaveTimeOpenWeatherMap(city) {
    if (!this.getSaveTimeOpenWeatherMap(city) && !this.getOpenWeatherMap(city)) return false;
    const timeForCheck = moment();
    const timeDifference = moment.duration(timeForCheck.diff(this.getSaveTimeOpenWeatherMap(city)));
    if (timeDifference.as('hours') >= 2) return true;
    else return false;
  }
}
