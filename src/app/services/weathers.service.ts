import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { WeatherStackAPI, OpenWeatherMapAPI, Location, Weather } from '../store/interfeces/weathers.interfaces';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class WeathersService {
  constructor(private http: HttpClient) { }

  public getWeatherStack({ point }: Location): Observable<WeatherStackAPI> {
    const queryCoordinates = `${point.lat.toFixed(4)},${point.lng.toFixed(4)}`;
    return this.http
      .get(environment.weatherstackUrl, {
        params: new HttpParams()
          .set(`access_key`, environment.weatherstackKey)
          .set(`query`, queryCoordinates)
      }).pipe(
        map((data: WeatherStackAPI) => data)
      );
  }

  public getOpenWeatherMap({ point }: Location): Observable<OpenWeatherMapAPI> {
    return this.http
      .get(environment.openweathermapUrl, {
        params: new HttpParams()
          .set(`lat`, `${point.lat}`)
          .set(`lon`, `${point.lng}`)
          .set(`appid`, environment.openweathermapKey),
      })
      .pipe(
        map((data: OpenWeatherMapAPI) => data)
      );
  }
}
