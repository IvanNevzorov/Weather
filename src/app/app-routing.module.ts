import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './components/weather/weather.component';
import { LocationComponent } from './components/location/location.component';


const routes: Routes = [
    { path: 'weather', component: WeatherComponent },
    { path: 'location', component: LocationComponent },
    { path: '**', redirectTo: 'profile' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})

export class AppRoutingModule {
}
