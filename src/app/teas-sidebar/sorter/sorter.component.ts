import { Component, OnInit, Input } from '@angular/core';

import { Tea } from '../../tea';
import { SorterService, Sorter, SortDirection } from '../../sorter.service';

@Component({
    selector: 'hg-sorter',
    templateUrl: './sorter.component.html',
    styleUrls: ['./sorter.component.css']
})
export class SorterComponent implements OnInit {
    @Input() teas: Tea[];

    private sorterRecentEntries = 'Recent entries';
    // private sorterRatingsAvg = 'Average ratings';
    // private sorterRatingsMedian = 'Median ratings';

    constructor(public sorters: SorterService) { }

    ngOnInit() {
        this.sorters.active.addFieldComparator(this.sorterRecentEntries, (t1, t2: Tea, dir: SortDirection): number => {
            // TODO: make use of dir
            if (t1.latestEntry == null && t2.latestEntry == null) {
                return 0;
            } else if (t1.latestEntry == null && t2.latestEntry != null) {
                return 1;
            } else if (t1.latestEntry != null && t2.latestEntry == null) {
                return -1;
            } else {
                if (dir === SortDirection.DESC) { // Sort newest to oldest
                    return t2.latestEntry.datetime.getTime() - t1.latestEntry.datetime.getTime();
                } else { // Sort oldest to newest
                    return t1.latestEntry.datetime.getTime() - t2.latestEntry.datetime.getTime();
                }
            }
        });
        this.sorters.active.assignField(this.sorterRecentEntries, SortDirection.DESC);
    }
}
