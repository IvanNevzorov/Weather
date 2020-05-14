import { Weather, Location, Capitals } from '../interfeces/weathers.interfaces';
import { WeatherUnionAction, WeathersActionTypes } from './../actions/weathers.action';
import { Session, User } from '../interfeces/users.interfaces';

export interface State {
  location: Location;
  weather: Weather;
  capitals: Capitals;
  resource: string;
  session: Session;
  user: User;
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
  capitals: {},
  resource: '',
  session: {
    id: 0,
    status: false
  },
  user: {
    firstName: '',
    lastName: '',
    city: '',
    photoUrl: ''
  }
};

export const reducer = (state: State = initialState, action: WeatherUnionAction) => {

  switch (action.type) {
    case WeathersActionTypes.AddSession:
      return { ...state, session: action.payload };

    case WeathersActionTypes.AddUser:
      return { ...state, user: action.payload };

    case WeathersActionTypes.GetCapitals:
      return state;

    case WeathersActionTypes.AddCapitals:
      return { ...state, capitals: { ...state.capitals, [action.payload.capital]: action.payload } };

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
