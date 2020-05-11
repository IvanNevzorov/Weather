import {
  OpenWeatherMapAPI,
  WeatherStackAPI,
  Weather,
  LocationAPI,
  GeoLocationAPI,
  Location,
  WeatherCapital
} from './../store/interfeces/weathers.interfaces';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class SerializeService {
  constructor() { }

  public locationAPI(locationAPI: LocationAPI): string {
    const { city } = locationAPI;
    return city;
  }

  public geoLocationAPI(geoLocationAPI: GeoLocationAPI): Location {
    const { country, name, point } = geoLocationAPI.hits[0];
    return { country, city: name, point };
  }

  public weatherStackCapitalAPI(weatherAPI: WeatherStackAPI, capital: string): WeatherCapital {
    const { temperature, weather_descriptions } = weatherAPI.current;
    return {
      capital,
      temperature,
      description: weather_descriptions[0]
    };
  }

  public weatherStackAPI(weatherAPI: WeatherStackAPI): Weather {
    const { temperature, feelslike, weather_descriptions, wind_speed, humidity } = weatherAPI.current;
    return {
      resourse: 'WeatherStack',
      temperature,
      feels_like: feelslike,
      description: weather_descriptions[0],
      wind_speed,
      humidity,
    };
  }

  public openWeatherMapAPI(weatherAPI: OpenWeatherMapAPI): Weather {
    const {
      main: { temp, feels_like, humidity },
      wind: { speed },
      weather: [{ description }],
    } = weatherAPI;
    return {
      resourse: 'OpenWeatherMap',
      temperature: Math.ceil(temp - 273),
      feels_like: Math.ceil(feels_like - 273),
      description,
      wind_speed: speed,
      humidity,
    };
  }
}
