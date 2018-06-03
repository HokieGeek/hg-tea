import { Component, OnInit, Input } from '@angular/core';

import { ViewService, Filter } from '../../../view.service';

@Component({
    selector: 'hg-string-field',
    templateUrl: './string-field.component.html',
    styleUrls: ['./string-field.component.css']
})
export class StringFieldComponent implements OnInit {
    @Input() name: string;
    @Input() values: string[];

    constructor(public view: ViewService) { }

    ngOnInit() {
    }

    get filter(): Filter {
        return this.view.filter;
    }
}
