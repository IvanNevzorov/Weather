import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { WeatherStackAPI, OpenWeatherMapAPI, Location, Weather } from '../store/interfeces/weathers.interfaces';
import { Observable } from 'rxjs';

export enum WeathersUrlType {
  weatherstack = 'http://api.weatherstack.com/current',
  openweathermap = 'http://api.openweathermap.org/data/2.5/weather',
}

@Injectable({ providedIn: 'root' })
export class WeathersService {
  constructor(private http: HttpClient) { }

  public getWeatherStack({ point }: Location): Observable<WeatherStackAPI> {
    const queryCoordinates = `${point.lat.toFixed(4)},${point.lng.toFixed(4)}`;
    return this.http
      .get(WeathersUrlType.weatherstack, {
        params: new HttpParams()
          .set(`access_key`, 'f8a2ca6d0dfb37f60b8f7eaa9aae45e3')
          .set(`query`, queryCoordinates)
      }).pipe(
        map((data: WeatherStackAPI) => data)
      );
  }

  public getOpenWeatherMap({ point }: Location): Observable<OpenWeatherMapAPI> {
    return this.http
      .get(WeathersUrlType.openweathermap, {
        params: new HttpParams().set(`lat`, `${point.lat}`).set(`lon`, `${point.lng}`).set(`appid`, 'bad363469dcde2c6fae81f5295fc72d3'),
      })
      .pipe(
        map((data: OpenWeatherMapAPI) => data)
      );
  }
}
