import { Component, OnInit, Input } from '@angular/core';

import { SorterService, Sorter } from '../../sorter.service';

@Component({
    selector: 'hg-sorter',
    templateUrl: './sorter.component.html',
    styleUrls: ['./sorter.component.css']
})
export class SorterComponent implements OnInit {
    private _teas: Tea[];

    const sorterRecentEntries = 'RecentEntries';

    constructor(public sorter: SorterService) { }

    ngOnInit() {
        this.sorter.active.addFieldComparator(this.sorterRecentEntries, (t1, t2: Tea, dir: SortDirection): number => {
            // TODO: make use of dir
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
        this.sorter.active.assignField(this.sorterRecentEntries);
    }

    get teas(): Tea[] {
        return this._teas;
    }

    @Input()
    set teas(_teas) {
        this._teas = _teas;
    }
}
