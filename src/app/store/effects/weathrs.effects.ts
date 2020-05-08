import { StorageService } from './../../services/storage.service';
import {
  WeathersActionTypes,
  AddLocationAction,
  WeatherStackLoadSuccessAction,
  WeatherStackLoadErrorAction,
  OpenWeatherMapLoadSuccessAction,
  OpenWeatherMapLoadErrorAction,
  WeatherStackLoadAction,
  OpenWeatherMapLoadAction,
  GetLocationAction,
} from './../actions/weathers.action';
import { WeathersService } from './../../services/weathers.service';
import { LocationService } from './../../services/location.service';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of, iif } from 'rxjs';
import { Weather, Location, WeatherStackAPI, OpenWeatherMapAPI } from '../interfeces/weathers.interfaces';

@Injectable({ providedIn: 'root' })

export class WeathersEffecrs {

  @Effect()
  public initLocation$ = this.actions$.pipe(
    ofType(WeathersActionTypes.InitLocation),
    mergeMap(() =>
      this.locationService.initLocation().pipe(
        map((data: Location) => new AddLocationAction(data))
      )
    )
  );

  @Effect()
  public getLocation$ = this.actions$.pipe(
    ofType(WeathersActionTypes.GetLocation),
    mergeMap((action: GetLocationAction) =>
      this.locationService.getGeoLocation(action.payload).pipe(
        map((data: Location) => new AddLocationAction(data))
      )
    )
  );

  @Effect()
  public WeatherStackLoad$ = this.actions$.pipe(
    ofType(WeathersActionTypes.WeatherStackLoad),
    mergeMap((action: WeatherStackLoadAction) =>
      this.weathersService.getWeatherStack(action.payload).pipe(
        map((data: WeatherStackAPI) => {
          console.log(data);
          const weather: Weather = this.weatherStackSerialaze(data);
          return new WeatherStackLoadSuccessAction(weather);
        }),
        catchError(() => of(new WeatherStackLoadErrorAction()))
      )
    )
  );

  @Effect()
  public OpenWeatherMapLoad$ = this.actions$.pipe(
    ofType(WeathersActionTypes.OpenWeatherMapLoad),
    mergeMap((action: OpenWeatherMapLoadAction) =>
      this.weathersService.getOpenWeatherMap(action.payload).pipe(
        map((data: OpenWeatherMapAPI) => {
          console.log(data);
          const weather: Weather = this.openWeatherMapSerialaze(data);
          return new OpenWeatherMapLoadSuccessAction(weather);
        }),
        catchError(() => of(new OpenWeatherMapLoadErrorAction()))
      )
    )
  );

  public weatherStackSerialaze(weatherAPI: WeatherStackAPI): Weather {
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

  public openWeatherMapSerialaze(weatherAPI: OpenWeatherMapAPI): Weather {
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

  constructor(
    private actions$: Actions,
    private locationService: LocationService,
    private weathersService: WeathersService,
    private storageService: StorageService
  ) { }

}
