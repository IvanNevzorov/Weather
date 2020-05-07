export interface LocationAPI {
    city: string;
}

export interface GeoLocationAPI {
    hits: [{
        country: string;
        point: {
            lng: number;
            lat: number;
        }
    }];
}

export interface Location {
    country: string;
    city: string;
    point: {
        lng: number;
        lat: number;
    };
}

export interface WeatherStackAPI {
    current: {
        temperature: number;
        feelslike: number;
        weather_descriptions: string[];
        wind_speed: number;
        humidity: number;
    };
}

export interface OpenWeatherMapAPI {
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
    };
    wind: {
        speed: number;
    };
    weather: [{
        description: string;
    }];
}

export interface WeatherStorage {
    weather: Weather;
    saveTime: string;
}

export interface Weather {
    resourse: string;
    temperature: number;
    feels_like: number;
    description: string;
    wind_speed: number;
    humidity: number;
}
