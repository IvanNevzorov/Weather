import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { WeatherStack, OpenWeatherMap } from '../store/models/weathers.model';
import { StorageService } from './storage.service';

export enum WeathersUrlType {
  weatherstack = 'http://api.weatherstack.com/current',
  openweathermap = 'http://api.openweathermap.org/data/2.5/weather'
}



@Injectable({ providedIn: 'root' })

export class WeathersService {
  constructor(private http: HttpClient, private storage: StorageService) { }

  getWeatherStack() {
    return this.http.get(WeathersUrlType.weatherstack, {
      params: new HttpParams()
        .set(`access_key`, 'f8a2ca6d0dfb37f60b8f7eaa9aae45e3')
        .set(`query`, 'Gomel')
    }).pipe(
      map((data: WeatherStack) => {
        const { temperature, feelslike, weather_descriptions, wind_speed, humidity } = data.current;
        const result = {
          resourse: 'WeatherStack',
          temperature,
          feels_like: feelslike,
          description: weather_descriptions[0],
          wind_speed,
          humidity
        };
        this.storage.setWeatherStack(result);
        return result;
      })
    );
  }

  getOpenWeatherMap() {
    return this.http.get(WeathersUrlType.openweathermap, {
      params: new HttpParams()
        .set(`q`, 'Gomel')
        .set(`appid`, 'bad363469dcde2c6fae81f5295fc72d3')
    }).pipe(
      map((data: OpenWeatherMap) => {
        const { main: { temp, feels_like, humidity }, wind: { speed }, weather: [{ description }] } = data;
        const result = {
          resourse: 'OpenWeatherMap',
          temperature: temp,
          feels_like,
          description,
          wind_speed: speed,
          humidity
        };
        this.storage.setOpenWeatherMap(result);
        return result;
      })
    );
  }
}
