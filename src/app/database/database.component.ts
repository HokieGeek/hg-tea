import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Tea } from '../tea';
import { Filter } from '../filter.service';
import { Sorter } from '../sorter.service';

@Component({
    selector: 'hg-database',
    templateUrl: 'database.component.html',
    styleUrls: ['./database.component.css']
})

export class DatabaseComponent implements OnInit, OnChanges {
    @Input() teas: Tea[];
    @Input() filter: Filter;
    @Input() sorter: Sorter;
    private _processedTeas: Tea[];

    constructor() { }

    ngOnInit() {
        this.filter.changed.subscribe(() => this.updateTeas());
        this.sorter.changed.subscribe(() => this.updateTeas());
    }

    ngOnChanges(changes: SimpleChanges) {
        this.updateTeas();
    }

    get processedTeas(): Tea[] {
        return this._processedTeas;
    }

    updateTeas(): void {
        this._processedTeas = this.teas
            .filter(t => this.filter.isMatch(t))
            .sort((t1, t2) => this.sorter.compare(t1, t2));
    }
}
