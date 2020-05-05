import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';
import { LocationAPI, GeoLocationAPI, Location } from '../store/interfeces/weathers.interfaces';
import { StorageService } from './storage.service';


export enum LocationUrlType {
  ipwhois = 'http://free.ipwhois.io/json/',
  geocode = 'https://graphhopper.com/api/1/geocode'
}

@Injectable({ providedIn: 'root' })

export class LocationService {
  constructor(private http: HttpClient, private storage: StorageService) { }

  public initLocation() {
    return this.getLocation().pipe(
      mergeMap((data) =>
        this.getGeoLocation(data).pipe(
          map((result) => result)
        )
      )
    )
  }

  public getLocation() {
    return this.http.get(LocationUrlType.ipwhois).pipe(
      map((data: LocationAPI) => {
        console.log(data);
        const { city } = data;
        return city;
      })
    )
  }

  getGeoLocation(city) {
    console.log(city);
    return this.http.get(LocationUrlType.geocode, {
      params: new HttpParams()
        .set('q', city)
        .set('locale', 'en')
        .set('key', '19fb703c-bd61-4844-bd4d-77d767c37a9a')
    }).pipe(
      map((data: GeoLocationAPI) => {
        console.log(data)
        const { country, name, point } = data.hits[0];
        const result = { country, name, point }
        return result;
      })
    )
  }
}
