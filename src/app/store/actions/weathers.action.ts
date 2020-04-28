import { Action } from '@ngrx/store';

export enum WeathersActionTypes {
  GetLocation = '[Location] Get Location',
  AddLocation = '[Location] Add Location',

  WeatherStackLoad = '[Weather] Load WeatherStack',
  WeatherStackLoadSuccess = '[Weather] Load Success WeatherStack',
  WeatherStackLoadError = '[Weather] Load Error WeatherStack',
  OpenWeatherMapLoad = '[Weather] Get OpenWeatherMap',
  OpenWeatherMapLoadSuccess = '[Weather] Load Success OpenWeatherMap',
  OpenWeatherMapLoadError = '[Weather] Load Error OpenWeatherMap'
}

export class GetLocation implements Action {
  readonly type = WeathersActionTypes.GetLocation;
}

export class AddLocation implements Action {
  readonly type = WeathersActionTypes.AddLocation;

  constructor(public payload: {}){}
}

export class WeatherStackLoad implements Action {
  readonly type = WeathersActionTypes.WeatherStackLoad;
}

export class WeatherStackLoadSuccess implements Action {
  readonly type = WeathersActionTypes.WeatherStackLoadSuccess;

  constructor(public payload: {}){}
}

export class WeatherStackLoadError implements Action {
  readonly type = WeathersActionTypes.WeatherStackLoadError;
}

export class OpenWeatherMapLoad implements Action {
  readonly type = WeathersActionTypes.OpenWeatherMapLoad;
}

export class OpenWeatherMapLoadSuccess implements Action {
  readonly type = WeathersActionTypes.OpenWeatherMapLoadSuccess;

  constructor(public payload: {}){}
}

export class OpenWeatherMapLoadError implements Action {
  readonly type = WeathersActionTypes.OpenWeatherMapLoadError;
}

export type WeatherUnion =
  | GetLocation
  | AddLocation
  | WeatherStackLoad
  | WeatherStackLoadSuccess
  | WeatherStackLoadError
  | OpenWeatherMapLoad
  | OpenWeatherMapLoadSuccess
  | OpenWeatherMapLoadError;

