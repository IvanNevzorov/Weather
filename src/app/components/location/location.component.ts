import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { GetLocationAction, InitLocationAction, WeatherStackLoadAction, OpenWeatherMapLoadAction } from 'src/app/store/actions/weathers.action';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
    }

    public initForm(): void {
        this.locationForm = this.fb.group({
            city: this.fb.control('', [Validators.required]),
            select: this.fb.control('', [Validators.required])
        });
    }

    public submit(): void {
        if (this.locationForm.valid) {
            const formData = { ...this.locationForm.value };
            this.store.dispatch(new GetLocationAction(formData.city));
            this.locationState$.subscribe((location) => {
                if (location.city) {
                    switch (formData.select) {
                        case 'weatherStack':
                            this.store.dispatch(new WeatherStackLoadAction(location));
                            break;
                        case 'openWeatherMap':
                            this.store.dispatch(new OpenWeatherMapLoadAction(location));
                            break;

                        default:
                            break;
                    }
                }
            });
        }
    }
}
