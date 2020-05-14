import { Injectable } from '@angular/core';
import { WeatherStorage, WeatherStackAPI, OpenWeatherMapAPI } from '../store/interfeces/weathers.interfaces';
import * as moment from 'moment/moment';

@Injectable({ providedIn: 'root' })

export class StorageService {
  constructor() { }

  public getWeather(url: string): WeatherStorage {
    return JSON.parse(localStorage.getItem(url));
  }

  public setWeather(weatherAPI: WeatherStackAPI | OpenWeatherMapAPI, url: string): void {
    const saveTime = moment().toISOString();
    localStorage.setItem(url, JSON.stringify({ weatherAPI, saveTime }));
  }

  public checkWeather(url: string): boolean {
    if (this.getWeather(url)) {
      const timeForCheck = moment();
      const timeDifference = moment.duration(timeForCheck.diff(this.getWeather(url).saveTime));
      if (timeDifference.as('hours') <= 2) {
        return true;
      } else { return false; }
    } else { return false; }
  }

}
