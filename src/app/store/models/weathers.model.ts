export interface Location {
    city: string;
    country: string
}

export interface Weather {
    resourse: string;
    temperature: number;
    feels_like: number;
    description: string;
    wind_speed: number;
    humidity: number;
}

export interface WeatherStack {
    current: {
        temperature: number;
        feelslike: number;
        weather_descriptions: string[];
        wind_speed: number;
        humidity: number;
    }

}

export interface OpenWeatherMap {
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
