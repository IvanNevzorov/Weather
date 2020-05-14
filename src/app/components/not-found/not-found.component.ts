import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss']
})

export class NotFoundComponent implements OnInit {
    public path: string;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.path = this.route.snapshot.url[0].path;
    }
}
