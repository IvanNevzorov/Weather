import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LocationUrlType } from './location.service';
import { WeathersUrlType } from './weathers.service';
import { StorageService } from './storage.service';

@Injectable()
export class LocationInterceptor implements HttpInterceptor {
  constructor(private storage: StorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders();
    const authReq = req.clone({ headers });
    console.log(req);
    switch (authReq.url) {
      case LocationUrlType.ipwhois:
        if (this.storage.getloction()) {
          return of(this.storage.getloction());
        }
        return next.handle(authReq);

      case WeathersUrlType.weatherstack:
        if (this.storage.getWeatherStack()) {
          return of(this.storage.getWeatherStack());
        }
        return next.handle(authReq);

      case WeathersUrlType.openweathermap:
        if (this.storage.getOpenWeatherMap()) {
          return of(this.storage.getOpenWeatherMap());
        }
        return next.handle(authReq);

      default:
        break;
    }

    return next.handle(authReq);
  }
}
