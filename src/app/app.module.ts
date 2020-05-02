import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { WeathersEffecrs } from './store/effects/weathrs.effects';
import { reducers } from './store';
import { WeatherStackComponent } from './components/wetherstack/wetherstack.component';
import { SelectWeatherComponent } from './components/select-weather/select-weather.component';
import { OpenWeatherMapComponent } from './components/openweathermap/openweathermap.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherStackComponent,
    SelectWeatherComponent,
    OpenWeatherMapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([WeathersEffecrs])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
