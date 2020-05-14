import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { GetLocationAction, WeatherStackLoadAction, OpenWeatherMapLoadAction } from 'src/app/store/actions/weathers.action';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { selectLocationState } from 'src/app/store';
import { Location } from 'src/app/store/interfeces/weathers.interfaces';
import { Router } from '@angular/router';
@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss']
})

export class LocationComponent implements OnInit, OnDestroy {
    public locationForm: FormGroup;
    public locationState$: Observable<Location> = this.store.pipe(select(selectLocationState));
    public subscriber: Subscription;


    constructor(
        private store: Store,
        private fb: FormBuilder,
        private router: Router
    ) { }

    ngOnInit() {
        this.initForm();
    }

    ngOnDestroy() {
        if (this.subscriber !== undefined) {
            this.subscriber.unsubscribe();
        }

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
            this.subscriber = this.locationState$.subscribe((location) => {
                if (location.city === formData.city) {
                    switch (formData.select) {
                        case 'weatherStack':
                            this.store.dispatch(new WeatherStackLoadAction(location));
                            this.router.navigate(['/weather']);
                            break;

                        case 'openWeatherMap':
                            this.store.dispatch(new OpenWeatherMapLoadAction(location));
                            this.router.navigate(['/weather']);
                            break;

                        default:
                            break;
                    }
                }
            });
        }
    }
}
