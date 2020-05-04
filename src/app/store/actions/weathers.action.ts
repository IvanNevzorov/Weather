import { Action } from '@ngrx/store';
import { Weather, Location } from '../models/weathers.model';

export enum WeathersActionTypes {
  InitLocation = '[Location] Init Location',
  GetLocation = '[Location] Get Location',
  AddLocation = '[Location] Add Location',

  WeatherStackLoad = '[Weather] Load WeatherStack',
  WeatherStackLoadSuccess = '[Weather] Load Success WeatherStack',
  WeatherStackLoadError = '[Weather] Load Error WeatherStack',
  OpenWeatherMapLoad = '[Weather] Get OpenWeatherMap',
  OpenWeatherMapLoadSuccess = '[Weather] Load Success OpenWeatherMap',
  OpenWeatherMapLoadError = '[Weather] Load Error OpenWeatherMap'
}

export class InitLocation implements Action {
  readonly type = WeathersActionTypes.GetLocation;
}

export class GetLocation implements Action {
  readonly type = WeathersActionTypes.GetLocation;

  constructor(public payload: string) { }
}

export class AddLocation implements Action {
  readonly type = WeathersActionTypes.AddLocation;

  constructor(public payload: Location) { }
}

export class WeatherStackLoad implements Action {
  readonly type = WeathersActionTypes.WeatherStackLoad;

  constructor(public payload: Location) { }
}

export class WeatherStackLoadSuccess implements Action {
  readonly type = WeathersActionTypes.WeatherStackLoadSuccess;

  constructor(public payload: Weather) { }
}

export class WeatherStackLoadError implements Action {
  readonly type = WeathersActionTypes.WeatherStackLoadError;
}

export class OpenWeatherMapLoad implements Action {
  readonly type = WeathersActionTypes.OpenWeatherMapLoad;

  constructor(public payload: Location) { }
}

export class OpenWeatherMapLoadSuccess implements Action {
  readonly type = WeathersActionTypes.OpenWeatherMapLoadSuccess;

  constructor(public payload: Weather) { }
}

export class OpenWeatherMapLoadError implements Action {
  readonly type = WeathersActionTypes.OpenWeatherMapLoadError;
}

export type WeatherUnion =
  | InitLocation
  | GetLocation
  | AddLocation
  | WeatherStackLoad
  | WeatherStackLoadSuccess
  | WeatherStackLoadError
  | OpenWeatherMapLoad
  | OpenWeatherMapLoadSuccess
  | OpenWeatherMapLoadError;

