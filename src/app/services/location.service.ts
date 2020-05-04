import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LocationAPI, GeoLocationAPI } from '../store/models/weathers.model';
import { StorageService } from './storage.service';
import { of } from 'rxjs';


export enum LocationUrlType {
  ipwhois = 'http://free.ipwhois.io/json/',
  datadata = 'https://graphhopper.com/api/1/geocode'
}

@Injectable({ providedIn: 'root' })

export class LocationService {
  constructor(private http: HttpClient, private storage: StorageService) { }

  async initLocation() {
    let initLocation;
    await this.getLocation().subscribe(data => initLocation = data)

    return this.getGeoLocation(initLocation);
  }

  getLocation() {
    return this.http.get(LocationUrlType.ipwhois).pipe(
      map((data: LocationAPI) => {
        console.log(data);
        const { city } = data;
        return city
      })
    )
  }

  getGeoLocation(city) {
    console.log(city);
    return this.http.get(LocationUrlType.datadata, {
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
