import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class LocationService {
  constructor(private http: HttpClient){}

  getLovation(){
    return this.http.get('http://free.ipwhois.io/json/', {
      headers: new HttpHeaders()
      .append(`request`, 'location')
    });
  }
}
