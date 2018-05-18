import { Component, OnInit, Input } from '@angular/core';

import { Filter } from '../../../filter.service';

@Component({
    selector: 'hg-flag-field',
    templateUrl: './flag-field.component.html',
    styleUrls: ['./flag-field.component.css']
})
export class FlagFieldComponent implements OnInit {
    @Input() label: string;
    @Input() name: string;
    @Input() filter: Filter;

    constructor() { }

    ngOnInit() {
    }

    toggle() {
        if (!this.filter.hasFlag(this.name)) {
            this.filter.withFlagOnly(this.name);
        } else if (this.filter.flagOnly(this.name)) {
            this.filter.withFlagExcluded(this.name);
        } else {
            this.filter.withoutFlag(this.name);
        }
    }
}
