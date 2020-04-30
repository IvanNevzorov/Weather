import { Location, Weather } from '../models/weathers.model';
import { WeatherUnion, WeathersActionTypes } from './../actions/weathers.action';

export interface State {
    location: Location;
    weatherStack: Weather;
    openWeatherMap: Weather;
    resource: string;
}

const initialState: State = {
    location: {
        city: '',
        country: ''
    },
    weatherStack: {
        resourse: '',
        temperature: 0,
        feels_like: 0,
        description: '',
        wind_speed: 0,
        humidity: 0
    },
    openWeatherMap: {
        resourse: '',
        temperature: 0,
        feels_like: 0,
        description: '',
        wind_speed: 0,
        humidity: 0
    },
    resource: ''
}

export const reducer = (state: State = initialState, action: WeatherUnion) => {

    switch (action.type) {
        case WeathersActionTypes.GetLocation:
            console.log('GetLocation')
            return state;

        case WeathersActionTypes.AddLocation:
            console.log('AddLocation')
            return { ...state, location: action.payload };

        case WeathersActionTypes.WeatherStackLoad:
            return state;

        case WeathersActionTypes.WeatherStackLoadSuccess:
            return { ...state, weatherStack: action.payload, resource: "WeatherStack" };

        case WeathersActionTypes.OpenWeatherMapLoad:
            return state;

        case WeathersActionTypes.OpenWeatherMapLoadSuccess:
            return { ...state, openWeatherMap: action.payload, resource: "OpenWeatherMap" };

        default:
            break;
    }
}