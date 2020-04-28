import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class StorageService {
  constructor(){}

  getloction() {
    return JSON.parse(localStorage.getItem('WeatherLocation'));
  }

  setLocation(location) {
    localStorage.setItem('WeatherLocation', JSON.stringify(location));
  }
}
