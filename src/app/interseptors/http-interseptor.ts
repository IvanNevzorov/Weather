import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { WeathersUrlType } from './../services/weathers.service';
import { tap } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';
import { WeatherStackAPI, OpenWeatherMapAPI } from '../store/interfeces/weathers.interfaces';

@Injectable()
export class HttpWeatherInterceptor implements HttpInterceptor {
    constructor(private storageService: StorageService) { }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes(WeathersUrlType.weatherstack) || req.url.includes(WeathersUrlType.openweathermap)) {
            if (this.storageService.checkWeather(req.urlWithParams)) {
                const body: WeatherStackAPI | OpenWeatherMapAPI = this.storageService.getWeather(req.urlWithParams).weatherAPI;
                const response: Observable<HttpEvent<WeatherStackAPI | OpenWeatherMapAPI>> = of(new HttpResponse({body}));
                return response;
            } else {
              console.log(req);
                return next.handle(req).pipe(
                    tap((event: HttpEvent<WeatherStackAPI | OpenWeatherMapAPI>) => {
                        if (event instanceof HttpResponse) {
                            this.storageService.setWeather(event.body, req.urlWithParams);
                        }
                    })
                );
            }
        }
        return next.handle(req);
    }
}
