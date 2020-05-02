import { StorageService } from './../../services/storage.service';
import {
  WeathersActionTypes,
  AddLocation,
  WeatherStackLoadSuccess,
  WeatherStackLoadError,
  OpenWeatherMapLoadSuccess,
  OpenWeatherMapLoadError,
  WeatherStackLoad,
  OpenWeatherMapLoad,
} from './../actions/weathers.action';
import { WeathersService } from './../../services/weathers.service';
import { LocationService } from './../../services/location.service';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of, iif } from 'rxjs';
import { Location, Weather } from '../models/weathers.model';

@Injectable({ providedIn: 'root' })

export class WeathersEffecrs {

  @Effect()
  public getLocation$ = this.actions$.pipe(
    ofType(WeathersActionTypes.GetLocation),
    mergeMap(() =>
      this.location.getLocation().pipe(
        map((data: Location) => new AddLocation(data))
      )
    )
  )

  @Effect()
  public WeatherStackLoad$ = this.actions$.pipe(
    ofType(WeathersActionTypes.WeatherStackLoad),
    mergeMap((action: WeatherStackLoad) =>
      iif(() => this.storage.checkSaveTimeWeatherStack(), this.storageWeatherStack(), this.serviceWeatherStack(action.payload))
    )
  )

  @Effect()
  public OpenWeatherMapLoad$ = this.actions$.pipe(
    ofType(WeathersActionTypes.OpenWeatherMapLoad),
    mergeMap((action: OpenWeatherMapLoad) =>
      iif(() => this.storage.checkSaveTimeOpenWeatherMap(), this.storageOpenWeatherMap(), this.serviceOpenWeatherMap(action.payload))
    )
  )

  private storageWeatherStack() {
    return of(this.storage.getWeatherStack()).pipe(
      map((data: Weather) => new WeatherStackLoadSuccess(data)),
      catchError(() => of(new WeatherStackLoadError()))
    )
  }

  private serviceWeatherStack(city: string) {
    return this.weathers.getWeatherStack(city).pipe(
      map((data: Weather) => new WeatherStackLoadSuccess(data)),
      catchError(() => of(new WeatherStackLoadError()))
    )
  }

  private storageOpenWeatherMap() {
    return of(this.storage.getOpenWeatherMap()).pipe(
      map((data: Weather) => new OpenWeatherMapLoadSuccess(data)),
      catchError(() => of(new OpenWeatherMapLoadError()))
    )
  }

  private serviceOpenWeatherMap(city: string) {
    return this.weathers.getOpenWeatherMap(city).pipe(
      map((data: Weather) => new OpenWeatherMapLoadSuccess(data)),
      catchError(() => of(new OpenWeatherMapLoadError()))
    )
  }

  constructor(
    private actions$: Actions,
    private location: LocationService,
    private weathers: WeathersService,
    private storage: StorageService
  ) { }

}
