import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { WeathersUrlType } from './../services/weathers.service';
import { tap } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';
import { WeatherStorage, Weather } from '../store/interfeces/weathers.interfaces';

@Injectable()
export class HttpWeatherInterceptor implements HttpInterceptor {
    constructor(private storageService: StorageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes(WeathersUrlType.weatherstack) || req.url.includes(WeathersUrlType.openweathermap)) {
            if (this.storageService.checkWeather(req.url)) {
                const data: WeatherStorage = this.storageService.getWeather(req.url);
                const body: Weather = data.weather;
                const response: Observable<HttpEvent<Weather>> = of(new HttpResponse<Weather>({ body }));
                return response;
            } else {
                return next.handle(req).pipe(
                    tap((event: any) => {
                        this.storageService.setWeather(event, req.url);
                    })
                );
            }
        }
        return next.handle(req);
    }
}
