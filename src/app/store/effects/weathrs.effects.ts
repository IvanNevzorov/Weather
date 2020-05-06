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
import { Weather, Location } from '../interfeces/weathers.interfaces';

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
        map((data: Weather) => new WeatherStackLoadSuccessAction(data)),
        catchError(() => of(new WeatherStackLoadErrorAction()))
      )
    )
  );

  @Effect()
  public OpenWeatherMapLoad$ = this.actions$.pipe(
    ofType(WeathersActionTypes.OpenWeatherMapLoad),
    mergeMap((action: OpenWeatherMapLoadAction) =>
      this.weathersService.getWeatherStack(action.payload).pipe(
        map((data: Weather) => new OpenWeatherMapLoadSuccessAction(data)),
        catchError(() => of(new OpenWeatherMapLoadErrorAction()))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private locationService: LocationService,
    private weathersService: WeathersService,
    private storageService: StorageService
  ) { }

}
