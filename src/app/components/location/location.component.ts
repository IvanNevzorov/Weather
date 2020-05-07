import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { GetLocationAction, InitLocationAction, WeatherStackLoadAction, OpenWeatherMapLoadAction } from 'src/app/store/actions/weathers.action';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { selectLocationState } from 'src/app/store';
import { Location } from 'src/app/store/interfeces/weathers.interfaces';
@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss']
})

export class LocationComponent implements OnInit {
    public locationForm: FormGroup;
    public locationState$: Observable<Location> = this.store.pipe(select(selectLocationState));

    constructor(
        private store: Store,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.initForm();
        this.initLocation();
    }

    public initForm(): void {
        this.locationForm = this.fb.group({
            city: this.fb.control('', []),
            select: this.fb.control('', [])
        });
    }

    public initLocation(): void {
        this.store.dispatch(new InitLocationAction());
        const subscriber = this.locationState$.subscribe(location => {
            if (location.city) {
                console.log(location);
                this.locationForm.patchValue({ city: location.city });
                this.store.dispatch(new InitLocationAction());
                this.store.dispatch(new WeatherStackLoadAction(location));
                subscriber.unsubscribe();
            }
        });
    }

    public submit(): void {
        if (this.locationForm.valid) {
            const formData = { ...this.locationForm.value };
            this.store.dispatch(new GetLocationAction(formData.city));
            const subscriber = this.locationState$.subscribe((location) => {
                console.log(formData, location);
                if (location.city === formData.city) {
                    switch (formData.select) {
                        case 'weatherStack':
                            this.store.dispatch(new WeatherStackLoadAction(location));
                            subscriber.unsubscribe();
                            break;
                        case 'weatherStack':
                            this.store.dispatch(new OpenWeatherMapLoadAction(location));
                            subscriber.unsubscribe();
                            break;

                        default:
                            subscriber.unsubscribe();
                            break;
                    }
                }

            });
        }
    }
}