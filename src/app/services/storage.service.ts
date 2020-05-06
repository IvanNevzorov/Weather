import { Injectable } from '@angular/core';
import { Weather, WeatherStorage } from '../store/interfeces/weathers.interfaces';
import * as moment from 'moment/moment';

@Injectable({ providedIn: 'root' })

export class StorageService {
  constructor() { }

  public getWeather(url: string): WeatherStorage {
    return JSON.parse(localStorage.getItem(url));
  }

  public setWeather(weather: Weather, url: string): void {
    const saveTime = moment().toISOString();
    const data = { weather, saveTime };
    localStorage.setItem(url, JSON.stringify(data));
  }

  public checkWeather(url: string): boolean {
    if (!this.getWeather(url)) { return false; }
    const timeForCheck = moment();
    const timeDifference = moment.duration(timeForCheck.diff(this.getWeather(url).saveTime));
    if (timeDifference.as('hours') >= 2) {
      return true;
    } else { return false; }
  }
}
