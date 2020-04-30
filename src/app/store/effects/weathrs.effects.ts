import { StorageService } from './../../services/storage.service';
import {
  WeathersActionTypes,
  AddLocation,
  WeatherStackLoadSuccess,
  WeatherStackLoadError,
  OpenWeatherMapLoadSuccess,
  OpenWeatherMapLoadError,
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
      iif(() => !!this.storage.getloction(), this.trueLocation, this.falsLocation)
    )
  )

  @Effect()
  public WeatherStackLoad$ = this.actions$.pipe(
    ofType(WeathersActionTypes.WeatherStackLoad),
    mergeMap(() =>
      iif(() => !!this.storage.getWeatherStack(), this.trueWeatherStack, this.falseWeatherStack)
    )
  )

  @Effect()
  public OpenWeatherMapLoad$ = this.actions$.pipe(
    ofType(WeathersActionTypes.OpenWeatherMapLoad),
    mergeMap(() =>
      iif(() => !!this.storage.getOpenWeatherMap(), this.trueOpenWeatherMap, this.falseOpenWeatherMap)
    )
  )

  private trueLocation = of(this.storage.getloction()).pipe(
    map((data: Location) => new AddLocation(data))
  );

  private falsLocation = this.location.getLocation().pipe(
    map((data: Location) => new AddLocation(data))
  );

  private trueWeatherStack = of(this.storage.getWeatherStack()).pipe(
    map((data: Weather) => new WeatherStackLoadSuccess(data)),
    catchError(() => of(new WeatherStackLoadError()))
  );

  private falseWeatherStack = this.weathers.getWeatherStack().pipe(
    map((data: Weather) => new WeatherStackLoadSuccess(data)),
    catchError(() => of(new WeatherStackLoadError()))
  );

  private trueOpenWeatherMap = of(this.storage.getOpenWeatherMap()).pipe(
    map((data: Weather) => new OpenWeatherMapLoadSuccess(data)),
    catchError(() => of(new OpenWeatherMapLoadError()))
  );

  private falseOpenWeatherMap = this.weathers.getOpenWeatherMap().pipe(
    map((data: Weather) => new OpenWeatherMapLoadSuccess(data)),
    catchError(() => of(new OpenWeatherMapLoadError()))
  );

  constructor(
    private actions$: Actions,
    private location: LocationService,
    private weathers: WeathersService,
    private storage: StorageService
  ) { }

}
