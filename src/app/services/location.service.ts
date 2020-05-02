import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Location } from '../store/models/weathers.model';
import { StorageService } from './storage.service';


export enum LocationUrlType {
  ipwhois = 'http://free.ipwhois.io/json/'
}

@Injectable({ providedIn: 'root' })

export class LocationService {
  constructor(private http: HttpClient, private storage: StorageService) { }

  getLocation() {
    return this.http.get(LocationUrlType.ipwhois).pipe(
      map((data: Location) => {
        const { city, country } = data;
        return { city, country }
      })
    )
  }
}
