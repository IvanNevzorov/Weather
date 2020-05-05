import * as weather from './redusers/weathers.reduser'
import { ActionReducerMap } from '@ngrx/store'
import { createSelector } from '@ngrx/store';

export interface State {
    weather: weather.State
}

export const reducers: ActionReducerMap<State> = {
    weather: weather.reducer
}

export const selectWeatherState = (state: State) => state.weather;

export const selectLocationState = createSelector(
    selectWeatherState,
    (weather: weather.State) => weather.location
)

export const selectWeatherStackState = createSelector(
    selectWeatherState,
    (weather: weather.State) => weather.weatherStack
)

export const selectOpenWeatherMapState = createSelector(
    selectWeatherState,
    (weather: weather.State) => weather.openWeatherMap
)

export const selectResourceState = createSelector(
    selectWeatherState,
    (weather: weather.State) => weather.resource
)
