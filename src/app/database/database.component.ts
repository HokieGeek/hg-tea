import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Tea } from '../tea';
import { Filter } from '../filter.service';

@Component({
    selector: 'hg-database',
    templateUrl: 'database.component.html',
    styleUrls: ['./database.component.css']
})

export class DatabaseComponent implements OnInit, OnChanges {
    @Input() teas: Tea[];
    @Input() filter: Filter;
    private processedTeas: Tea[];

    constructor() { }

    ngOnInit() {
        this.filter.changed.subscribe(() => this.updateTeas());
    }

    ngOnChanges(changes: SimpleChanges) {
        this.updateTeas();
    }

    updateTeas(): void {
        this.processedTeas = this.teas
            .filter(t => this.filter.isMatch(t))
            .sort((t1, t2: Tea): number => {
                if (t1.latestEntry == null && t2.latestEntry == null) {
                    return 0;
                } else if (t1.latestEntry == null && t2.latestEntry != null) {
                    return 1;
                } else if (t1.latestEntry != null && t2.latestEntry == null) {
                    return -1;
                } else {
                    // Sort newest to oldest
                    return t2.latestEntry.datetime.getTime() - t1.latestEntry.datetime.getTime();
                    // Sort oldest to newest
                    // return t1.latestEntry.datetime.getTime() - t2.latestEntry.datetime.getTime();
                }
            });
    }
}
