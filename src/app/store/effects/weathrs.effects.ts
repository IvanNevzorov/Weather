import { StorageService } from './../../services/storage.service';
import {
  WeathersActionTypes,
  AddLocation,
  WeatherStackLoadSuccess,
  WeatherStackLoadError,
  OpenWeatherMapLoadSuccess,
  OpenWeatherMapLoadError,
  GetLocation
} from './../actions/weathers.action';
import { WeathersService } from './../../services/weathers.service';
import { LocationService } from './../../services/location.service';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Location } from '../models/weathers.model';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable({ providedIn: 'root' })

export class WeathersEffecrs {

  // @Effect()
  // getLocation$ = this.actions$.pipe(
  //   ofType(WeathersActionTypes.GetLocation),
  //   mergeMap(() =>
  //     this.location.getLocation().pipe(
  //       map((data: Location) => {
  //         console.log(1)
  //         this.storage.setLocation(data)
  //         return new AddLocation({ ...data });
  //       })
  //     )
  //   )
  // )

  @Effect()
  public getLocation$ = this.actions$.pipe(
    ofType(WeathersActionTypes.GetLocation),
    switchMap((action: GetLocation) =>
      this.location.getLocation()),
    map((data: Location) =>
      new AddLocation(data)
    )
  )

  @Effect()
  WeatherStackLoad$ = this.actions$.pipe(
    ofType(WeathersActionTypes.WeatherStackLoad),
    mergeMap(() =>
      this.weathrs.getWeatherStack().pipe(
        map((data) => {
          this.storage.setWeatherStack(data);
          return of(new WeatherStackLoadSuccess(data));
        }),
        catchError(() => of(new WeatherStackLoadError()))
      )
    )
  )

  @Effect()
  OpenWeatherMapLoad$ = this.actions$.pipe(
    ofType(WeathersActionTypes.OpenWeatherMapLoad),
    mergeMap(() =>
      this.weathrs.getOpenWeatherMap().pipe(
        map((data) => {
          this.storage.setOpenWeatherMap(data);
          return new OpenWeatherMapLoadSuccess(data);
        }),
        catchError(() => of(new OpenWeatherMapLoadError()))
      )
    )
  )

  constructor(
    private actions$: Actions,
    private location: LocationService,
    private weathrs: WeathersService,
    private storage: StorageService
  ) { }
}
