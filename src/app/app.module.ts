import { HttpWeatherInterceptor } from './interseptors/http-interseptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { WeathersEffecrs } from './store/effects/weathrs.effects';
import { reducers } from './store';
import { LocationComponent } from './components/location/location.component';
import { WeatherComponent } from './components/weather/weather.component';
import {
  MaterializeButtonModule,
  MaterializeCardModule,
  MaterializeSelectModule,
  MaterializeInputModule,
  MaterializeNavbarModule
} from 'materialize-angular';
import { AppRoutingModule } from './app-routing.module';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LocationComponent,
    WeatherComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([WeathersEffecrs]),
    FormsModule,
    ReactiveFormsModule,
    MaterializeButtonModule,
    MaterializeCardModule,
    MaterializeSelectModule,
    MaterializeInputModule,
    MaterializeNavbarModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpWeatherInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
