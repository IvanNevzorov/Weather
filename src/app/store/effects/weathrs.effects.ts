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
  GetLocation,
} from './../actions/weathers.action';
import { WeathersService } from './../../services/weathers.service';
import { LocationService } from './../../services/location.service';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of, iif } from 'rxjs';
import { Weather, Location } from '../models/weathers.model';

@Injectable({ providedIn: 'root' })

export class WeathersEffecrs {

  @Effect()
  public initLocation$ = this.actions$.pipe(
    ofType(WeathersActionTypes.InitLocation),
    mergeMap(() =>
      this.location.initLocation().pipe(
        map((data: Location) => new AddLocation(data))
      )
    )
  )

  @Effect()
  public getLocation$ = this.actions$.pipe(
    ofType(WeathersActionTypes.GetLocation),
    mergeMap((action: GetLocation) =>
      this.location.getGeoLocation(action.payload).pipe(
        map((data: Location) => new AddLocation(data))
      )
    )
  )

  @Effect()
  public WeatherStackLoad$ = this.actions$.pipe(
    ofType(WeathersActionTypes.WeatherStackLoad),
    mergeMap((action: WeatherStackLoad) =>
      iif(() => this.storage.checkSaveTimeWeatherStack(action.payload), this.storageWeatherStack(action.payload.name), this.serviceWeatherStack(action.payload))
    )
  )

  @Effect()
  public OpenWeatherMapLoad$ = this.actions$.pipe(
    ofType(WeathersActionTypes.OpenWeatherMapLoad),
    mergeMap((action: OpenWeatherMapLoad) =>
      iif(() => this.storage.checkSaveTimeOpenWeatherMap(action.payload), this.storageOpenWeatherMap(action.payload.name), this.serviceOpenWeatherMap(action.payload))
    )
  )

  private storageWeatherStack(city: string) {
    return of(this.storage.getWeatherStack(city)).pipe(
      map((data: Weather) => new WeatherStackLoadSuccess(data)),
      catchError(() => of(new WeatherStackLoadError()))
    )
  }

  private serviceWeatherStack(location: Location) {
    return this.weathers.getWeatherStack(location).pipe(
      map((data: Weather) => new WeatherStackLoadSuccess(data)),
      catchError(() => of(new WeatherStackLoadError()))
    )
  }

  private storageOpenWeatherMap(city: string) {
    return of(this.storage.getOpenWeatherMap(city)).pipe(
      map((data: Weather) => new OpenWeatherMapLoadSuccess(data)),
      catchError(() => of(new OpenWeatherMapLoadError()))
    )
  }

  private serviceOpenWeatherMap(location: Location) {
    return this.weathers.getOpenWeatherMap(location).pipe(
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
