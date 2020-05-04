import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AddLocation, GetLocation } from 'src/app/store/actions/weathers.action';
import { FormGroup, FormBuilder } from '@angular/forms';
import { selectLocationState } from 'src/app/store';
import { LocationService } from 'src/app/services/location.service';

@Component({
    selector: 'app-select-weather',
    templateUrl: './select-weather.component.html',
    styleUrls: ['./select-weather.component.scss']
})

export class SelectWeatherComponent implements OnInit {
    public selectWeatherForm: FormGroup;
    public startLocation: string;

    @Output() selectWeather = new EventEmitter();

    constructor(private store: Store, private fb: FormBuilder, private locationService: LocationService) { }

    ngOnInit() {
        this.selectWeatherForm = this.fb.group({
            city: this.fb.control('', []),
            select: this.fb.control('', [])
        });

        this.store.pipe(select(selectLocationState)).subscribe(data => {
            if (data.name) {
                this.startLocation = data.name;
                this.selectWeatherForm.patchValue({ city: this.startLocation });
                this.selectWeather.emit('weatherStack');
            }
        });
    }

    submit() {
        if (this.selectWeatherForm.valid) {
            const formData = { ...this.selectWeatherForm.value }
            this.store.dispatch(new AddLocation(formData.city));
            this.selectWeather.emit(formData.select);
        }
    }
}