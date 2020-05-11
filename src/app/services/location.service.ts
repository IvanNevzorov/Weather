import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';
import { LocationAPI, GeoLocationAPI } from '../store/interfeces/weathers.interfaces';
import { Observable } from 'rxjs';
import { SerializeService } from './serialize.service';


export enum LocationUrlType {
  ipwhois = 'http://free.ipwhois.io/json/',
  geocode = 'https://graphhopper.com/api/1/geocode'
}

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
    return this.http.get(LocationUrlType.ipwhois).pipe(
      map((data: LocationAPI) => data)
    );
  }

  public getGeoLocation(city: string): Observable<GeoLocationAPI> {
    return this.http.get(LocationUrlType.geocode, {
      params: new HttpParams()
        .set('q', city)
        .set('locale', 'en')
        .set('key', '19fb703c-bd61-4844-bd4d-77d767c37a9a')
    }).pipe(
      map((data: GeoLocationAPI) => data)
    );
  }
}
