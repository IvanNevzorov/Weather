import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { WeatherStack, OpenWeatherMap } from '../store/models/wheathers.model';

export enum WeathersUrlType {
  weatherstack = 'http://api.weatherstack.com/current',
  openweathermap = 'http://api.openweathermap.org/data/2.5/weather'
}



@Injectable({ providedIn: 'root' })

export class WeathersService {
  constructor(private http: HttpClient) { }

  getWeatherStack() {
    return this.http.get('http://api.weatherstack.com/current', {
      params: new HttpParams()
        .set(`access_key`, 'f8a2ca6d0dfb37f60b8f7eaa9aae45e3')
        .set(`query`, 'Gomel')
    }).pipe(
      map((data: WeatherStack) => {
        return {
          resourse: 'WeatherStack',
          temperature: data.current.temperature,
          feels_like: data.current.feelslike,
          description: data.current.weather_descriptions[0],
          wind_speed: data.current.wind_speed,
          humidity: data.current.humidity
        };
      })
    );
  }

  getOpenWeatherMap() {
    return this.http.get('http://api.openweathermap.org/data/2.5/weather', {
      params: new HttpParams()
        .set(`q`, 'Gomel')
        .set(`appid`, 'bad363469dcde2c6fae81f5295fc72d3')
    }).pipe(
      map((data: OpenWeatherMap) => {
        return {
          resourse: 'OpenWeatherMap',
          temperature: data.main.temp,
          feels_like: data.main.feels_like,
          description: data.weather[0].description,
          wind_speed: data.wind.speed,
          humidity: data.main.humidity
        };
      })
    );
  }
}
