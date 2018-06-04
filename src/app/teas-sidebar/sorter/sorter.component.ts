import { Component, OnInit, Input } from '@angular/core';

import { Tea } from '../../tea';
import { ViewService, Sorter, SortDirection } from '../../view.service';

@Component({
    selector: 'hg-sorter',
    templateUrl: './sorter.component.html',
    styleUrls: ['./sorter.component.css']
})
export class SorterComponent implements OnInit {
    @Input() teas: Tea[];

    constructor(public view: ViewService) { }

    ngOnInit() {
    }

    availableFields(): string[] {
        return this.view.sorter.fields.filter(f => !this.view.sorter.assignedFields.includes(f));
    }

    assign(field: string) {
        this.view.sorter.assignField(field, SortDirection.DESC);
    }
}
