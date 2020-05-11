import * as weathersReduser from './redusers/weathers.reduser';
import { ActionReducerMap } from '@ngrx/store';
import { createSelector } from '@ngrx/store';

export interface State {
    weatherStore: weathersReduser.State;
}

export const reducers: ActionReducerMap<State> = {
    weatherStore: weathersReduser.reducer
};

export const selectWeatherAPIStore = (state: State) => state.weatherStore;

export const selectLocationState = createSelector(
    selectWeatherAPIStore,
    (weatherStore: weathersReduser.State) => weatherStore.location
);

export const selectWeatherState = createSelector(
    selectWeatherAPIStore,
    (weatherStore: weathersReduser.State) => weatherStore.weather
);

export const selectCapitalsState = createSelector(
  selectWeatherAPIStore,
  (weatherStore: weathersReduser.State) => weatherStore.capitals
);

export const selectResourceState = createSelector(
    selectWeatherAPIStore,
    (weatherStore: weathersReduser.State) => weatherStore.resource
);
