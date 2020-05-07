import * as weatherReduser from './redusers/weathers.reduser';
import { ActionReducerMap } from '@ngrx/store';
import { createSelector } from '@ngrx/store';

export interface State {
    weatherStore: weatherReduser.State;
}

export const reducers: ActionReducerMap<State> = {
    weatherStore: weatherReduser.reducer
};

export const selectWeatherAPIStore = (state: State) => state.weatherStore;

export const selectLocationState = createSelector(
    selectWeatherAPIStore,
    (weatherStore: weatherReduser.State) => weatherStore.location
);

export const selectWeatherState = createSelector(
    selectWeatherAPIStore,
    (weatherStore: weatherReduser.State) => weatherStore.weather
);

export const selectResourceState = createSelector(
    selectWeatherAPIStore,
    (weatherStore: weatherReduser.State) => weatherStore.resource
);
