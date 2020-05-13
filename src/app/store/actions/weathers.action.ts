import { Action } from '@ngrx/store';
import { Weather, Location, WeatherCapital } from '../interfeces/weathers.interfaces';
import { Session, User } from '../interfeces/users.interfaces';

export enum WeathersActionTypes {
  Inititialization = '[Inititialization] Inititialization',

  AddSession = '[Users] Add Session',
  AddUser = '[Users] Add User',

  GetCapitals = '[Capitals] Init Capitals',
  AddCapitals = '[Capitals] Get Capitals',

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
export class InitializationAction implements Action {
  readonly type = WeathersActionTypes.Inititialization;
}

export class AddSessionAction implements Action {
  readonly type = WeathersActionTypes.AddSession;

  constructor(public payload: Session) { }
}

export class AddUserAction implements Action {
  readonly type = WeathersActionTypes.AddUser;

  constructor(public payload: User) { }
}

export class GetCapitalsAction implements Action {
  readonly type = WeathersActionTypes.GetCapitals;

  constructor(public payload: Location) { }
}

export class AddCapitalsAction implements Action {
  readonly type = WeathersActionTypes.AddCapitals;

  constructor(public payload: WeatherCapital) { }
}

export class InitLocationAction implements Action {
  readonly type = WeathersActionTypes.InitLocation;
}

export class GetLocationAction implements Action {
  readonly type = WeathersActionTypes.GetLocation;

  constructor(public payload: string) { }
}

export class AddLocationAction implements Action {
  readonly type = WeathersActionTypes.AddLocation;

  constructor(public payload: Location) { }
}

export class WeatherStackLoadAction implements Action {
  readonly type = WeathersActionTypes.WeatherStackLoad;

  constructor(public payload: Location) { }
}

export class WeatherStackLoadSuccessAction implements Action {
  readonly type = WeathersActionTypes.WeatherStackLoadSuccess;

  constructor(public payload: Weather) { }
}

export class WeatherStackLoadErrorAction implements Action {
  readonly type = WeathersActionTypes.WeatherStackLoadError;
}

export class OpenWeatherMapLoadAction implements Action {
  readonly type = WeathersActionTypes.OpenWeatherMapLoad;

  constructor(public payload: Location) { }
}

export class OpenWeatherMapLoadSuccessAction implements Action {
  readonly type = WeathersActionTypes.OpenWeatherMapLoadSuccess;

  constructor(public payload: Weather) { }
}

export class OpenWeatherMapLoadErrorAction implements Action {
  readonly type = WeathersActionTypes.OpenWeatherMapLoadError;
}

export type WeatherUnionAction =
  | InitializationAction
  | AddSessionAction
  | AddUserAction
  | GetCapitalsAction
  | AddCapitalsAction
  | InitLocationAction
  | GetLocationAction
  | AddLocationAction
  | WeatherStackLoadAction
  | WeatherStackLoadSuccessAction
  | WeatherStackLoadErrorAction
  | OpenWeatherMapLoadAction
  | OpenWeatherMapLoadSuccessAction
  | OpenWeatherMapLoadErrorAction;

