import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Location } from '../store/models/weathers.model';


export enum LocationUrlType {
  ipwhois = 'http://free.ipwhois.io/json/'
}

@Injectable({ providedIn: 'root' })

export class LocationService {
  constructor(private http: HttpClient) { }

  getLocation() {
    return this.http.get('http://free.ipwhois.io/json/').pipe(
      map((data: Location) => {
        return {
          city: data.city,
          country: data.country
        };
      })
    );
  }
}
