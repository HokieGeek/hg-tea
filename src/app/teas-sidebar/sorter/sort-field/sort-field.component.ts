import { Component, OnInit, Input } from '@angular/core';

import { Sorter, SortField, SortDirection } from '../../../sorter.service';

@Component({
    selector: 'hg-sort-field',
    templateUrl: './sort-field.component.html',
    styleUrls: ['./sort-field.component.css']
})
export class SortFieldComponent implements OnInit {
    SortDirection = SortDirection;
    @Input() name: string;
    @Input() sorter: Sorter;

    constructor() { }

    ngOnInit() {
    }

    label() {
        return this.name + ' ' + (this.sorter.getSortDirection(this.name) === SortDirection.DESC ? '↓' : '↑');
    }
}
