import { Component, OnInit, Input } from '@angular/core';

import { ViewService, Filter } from '../../../view.service';

@Component({
    selector: 'hg-flag-field',
    templateUrl: './flag-field.component.html',
    styleUrls: ['./flag-field.component.css']
})
export class FlagFieldComponent implements OnInit {
    @Input() name: string;

    constructor(public view: ViewService) { }

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

    get filter(): Filter {
        return this.view.filter;
    }
}
