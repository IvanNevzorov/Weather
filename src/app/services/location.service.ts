import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';
import { LocationAPI, GeoLocationAPI } from '../store/interfeces/weathers.interfaces';
import { Observable } from 'rxjs';
import { SerializeService } from './serialize.service';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })

export class LocationService {
  constructor(private http: HttpClient, private serializeService: SerializeService) { }

  public initLocation(): Observable<GeoLocationAPI> {
    return this.getLocation().pipe(
      mergeMap((data: LocationAPI) =>
        this.getGeoLocation(this.serializeService.locationAPI(data)).pipe(
          map((geoData: GeoLocationAPI) => geoData)
        )
      )
    );
  }

  public getLocation(): Observable<LocationAPI> {
    return this.http.get(environment.ipwhoisUrl).pipe(
      map((data: LocationAPI) => data)
    );
  }

  public getGeoLocation(city: string): Observable<GeoLocationAPI> {
    return this.http.get(environment.geocodeUrl, {
      params: new HttpParams()
        .set('q', city)
        .set('locale', 'en')
        .set('key', environment.geocodeKey)
    }).pipe(
      map((data: GeoLocationAPI) => data)
    );
  }
}
