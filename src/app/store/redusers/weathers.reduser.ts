import { Weather, Location } from '../interfeces/weathers.interfaces';
import { WeatherUnionAction, WeathersActionTypes } from './../actions/weathers.action';

export interface State {
    location: Location;
    weather: Weather;
    resource: string;
}

const initialState: State = {
    location: {
        country: '',
        city: '',
        point: {
            lng: 0,
            lat: 0,
        }
    },
    weather: {
        resourse: '',
        temperature: 0,
        feels_like: 0,
        description: '',
        wind_speed: 0,
        humidity: 0
    },
    resource: ''
};

export const reducer = (state: State = initialState, action: WeatherUnionAction) => {

    switch (action.type) {
        case WeathersActionTypes.InitLocation:
            return state;

        case WeathersActionTypes.GetLocation:
            return state;

        case WeathersActionTypes.AddLocation:
            return { ...state, location: action.payload };

        case WeathersActionTypes.WeatherStackLoad:
            return state;

        case WeathersActionTypes.WeatherStackLoadSuccess:
            return { ...state, weather: action.payload, resource: 'WeatherStack' };

        case WeathersActionTypes.OpenWeatherMapLoad:
            return state;

        case WeathersActionTypes.OpenWeatherMapLoadSuccess:
            return { ...state, weather: action.payload, resource: 'OpenWeatherMap' };

        default:
            break;
    }
};
