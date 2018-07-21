import { Component, OnInit, Input } from '@angular/core';

import { ViewService, Sorter, SortDirection } from '../../../view.service';

@Component({
    selector: 'hg-sort-field',
    templateUrl: './sort-field.component.html',
    styleUrls: ['./sort-field.component.css']
})
export class SortFieldComponent implements OnInit {
    SortDirection = SortDirection;
    @Input() name: string;

    constructor(public view: ViewService) { }

    ngOnInit() {
    }

    get directionDesc(): boolean {
        // return this.sorter.getSortDirection(this.name) === SortDirection.DESC ? '↓' : '↑';
        return this.sorter.getSortDirection(this.name) === SortDirection.DESC;
    }

    get sorter(): Sorter {
        return this.view.sorter;
    }
}
