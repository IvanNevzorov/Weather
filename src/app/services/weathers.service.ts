import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({providedIn: 'root'})

export class WeathersService {
  constructor(private http: HttpClient) {}

  getWeatherStack(){
  return this.http.get('http://api.weatherstack.com/current', {
    params: new HttpParams()
    .set(`access_key`, 'f8a2ca6d0dfb37f60b8f7eaa9aae45e3')
    .set(`query`, 'Gomel')
  });
  }

  getOpenWeatherMap(){
    return this.http.get('http://api.openweathermap.org/data/2.5/weather', {
      params: new HttpParams()
      .set(`q`, 'Gomel')
      .set(`appid`, 'bad363469dcde2c6fae81f5295fc72d3')
    });
    }
}
