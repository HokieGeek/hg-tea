import { Component, OnInit, Input } from '@angular/core';

import { SortField, SortDirection } from '../../../sorter.service';

@Component({
    selector: 'hg-sort-field',
    templateUrl: './sort-field.component.html',
    styleUrls: ['./sort-field.component.css']
})
export class SortFieldComponent implements OnInit {
    SortDirection = SortDirection;
    @Input() field: SortField;

    constructor() { }

    ngOnInit() {
    }

    label() {
        return this.field.name + ' ' + SortDirection[this.field.sortDirection];
    }
}
