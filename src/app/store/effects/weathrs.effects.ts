import {
  WeathersActionTypes,
  AddLocationAction,
  WeatherStackLoadSuccessAction,
  WeatherStackLoadErrorAction,
  OpenWeatherMapLoadSuccessAction,
  OpenWeatherMapLoadErrorAction,
  WeatherStackLoadAction,
  OpenWeatherMapLoadAction,
  GetCapitalsAction,
  GetLocationAction,
  AddCapitalsAction
} from './../actions/weathers.action';
import { WeathersService } from './../../services/weathers.service';
import { LocationService } from './../../services/location.service';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Weather, WeatherCapital, WeatherStackAPI, OpenWeatherMapAPI, GeoLocationAPI, Location } from '../interfeces/weathers.interfaces';
import { SerializeService } from 'src/app/services/serialize.service';

@Injectable({ providedIn: 'root' })

export class WeathersEffecrs {

  @Effect()
  public getCapitals$ = this.actions$.pipe(
    ofType(WeathersActionTypes.GetCapitals),
    mergeMap((action: GetCapitalsAction) =>
      this.weathersService.getWeatherStack(action.payload).pipe(
        map((weatherData: WeatherStackAPI) => {
          const weatherCapital: WeatherCapital =
            this.serializeService.weatherStackCapitalAPI(weatherData, action.payload.city);
          return new AddCapitalsAction(weatherCapital);
        })
      )
    )
  );

  @Effect()
  public initLocation$ = this.actions$.pipe(
    ofType(WeathersActionTypes.InitLocation),
    mergeMap(() =>
      this.locationService.initLocation().pipe(
        map((data: GeoLocationAPI) => {
          const location: Location = this.serializeService.geoLocationAPI(data);
          return new AddLocationAction(location);
        })
      )
    )
  );

  @Effect()
  public getLocation$ = this.actions$.pipe(
    ofType(WeathersActionTypes.GetLocation),
    mergeMap((action: GetLocationAction) =>
      this.locationService.getGeoLocation(action.payload).pipe(
        map((data: GeoLocationAPI) => {
          const location: Location = this.serializeService.geoLocationAPI(data, action.payload);
          return new AddLocationAction(location);
        })
      )
    )
  );

  @Effect()
  public WeatherStackLoad$ = this.actions$.pipe(
    ofType(WeathersActionTypes.WeatherStackLoad),
    mergeMap((action: WeatherStackLoadAction) =>
      this.weathersService.getWeatherStack(action.payload).pipe(
        map((data: WeatherStackAPI) => {
          const weather: Weather = this.serializeService.weatherStackAPI(data);
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
          const weather: Weather = this.serializeService.openWeatherMapAPI(data);
          return new OpenWeatherMapLoadSuccessAction(weather);
        }),
        catchError(() => of(new OpenWeatherMapLoadErrorAction()))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private locationService: LocationService,
    private weathersService: WeathersService,
    private serializeService: SerializeService
  ) { }

}
