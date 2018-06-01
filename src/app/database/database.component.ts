import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';

import { Tea } from '../tea';
import { Filter, Sorter } from '../view.service';

@Component({
    selector: 'hg-database',
    templateUrl: 'database.component.html',
    styleUrls: ['./database.component.css']
})

export class DatabaseComponent implements OnInit, OnChanges, AfterViewInit {
    @Input() teas: Tea[] = [];
    @Input() filter: Filter;
    @Input() sorter: Sorter;
    private _processedTeas: Tea[];

    constructor() { }

    ngOnInit() { }

    ngAfterViewInit() {
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
