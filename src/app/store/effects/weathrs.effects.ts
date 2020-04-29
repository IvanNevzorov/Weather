import { StorageService } from './../../services/storage.service';
import {
  WeathersActionTypes,
  AddLocation,
  WeatherStackLoadSuccess,
  WeatherStackLoadError,
  OpenWeatherMapLoadSuccess,
  OpenWeatherMapLoadError
} from './../actions/weathers.action';
import { WeathersService } from './../../services/weathers.service';
import { LocationService } from './../../services/location.service';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class WeathersEffecrs {
  @Effect()
  getLocation$ = this.actions$.pipe(
    ofType(WeathersActionTypes.GetLocation),
    mergeMap(() =>
      this.location.getLocation().pipe(
        map((data) => {
          new AddLocation(data);
          this.storage.setLocation(data);
        })
      )
    )
  );

  @Effect()
  WeatherStackLoad$ = this.actions$.pipe(
    ofType(WeathersActionTypes.WeatherStackLoad),
    mergeMap(() =>
      this.weathrs.getOpenWeatherMap().pipe(
        map((data) => {
          new WeatherStackLoadSuccess(data);
          this.storage.setWeatherStack(data)
        }),
        catchError(() => of(new WeatherStackLoadError()))
      )
    )
  );

  @Effect()
  OpenWeatherMapLoad$ = this.actions$.pipe(
    ofType(WeathersActionTypes.OpenWeatherMapLoad),
    mergeMap(() =>
      this.weathrs.getWeatherStack().pipe(
        map((data) => {
          new OpenWeatherMapLoadSuccess(data)
          this.storage.setOpenWeatherMap(data)
        }),
        catchError(() => of(new OpenWeatherMapLoadError()))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private location: LocationService,
    private weathrs: WeathersService,
    private storage: StorageService) { }
}
