import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocationUrlType } from './location.service';
import { WeathersUrlType } from './weathers.service';
import { StorageService } from './storage.service';

@Injectable()
export class LocationInterceptor implements HttpInterceptor {
  constructor(private storage: StorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders();
    const authReq = req.clone({ headers });
    switch (authReq.url) {
      case LocationUrlType.ipwhois:
        if (this.storage.getloction()) {
          return this.storage.getloction();
        }
        return next.handle(authReq);
        break;

      case WeathersUrlType.weatherstack:
        if (this.storage.getWeatherStack()) {
          return this.storage.getWeatherStack();
        }
        return next.handle(authReq);
        break;

      case WeathersUrlType.openweathermap:
        if (this.storage.getOpenWeatherMap()) {
          return this.storage.getOpenWeatherMap();
        }
        return next.handle(authReq);
        break;

      default:
        break;
    }


    return next.handle(authReq);
  }
}
