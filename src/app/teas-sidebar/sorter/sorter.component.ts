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

    constructor(public sorters: SorterService) { }

    ngOnInit() {
        const sorterRecentEntries = 'Recent entries';

        this.sorters.active.addFieldComparator(sorterRecentEntries, (t1, t2: Tea, dir: SortDirection): number => {
            if (t1.latestEntry == null && t2.latestEntry == null) {
                return 0;
            } else if (t1.latestEntry == null && t2.latestEntry != null) {
                // TODO: make use of dir
                return 1;
            } else if (t1.latestEntry != null && t2.latestEntry == null) {
                // TODO: make use of dir
                return -1;
            } else {
                if (dir === SortDirection.DESC) { // Sort newest to oldest
                    return t2.latestEntry.datetime.getTime() - t1.latestEntry.datetime.getTime();
                } else { // Sort oldest to newest
                    return t1.latestEntry.datetime.getTime() - t2.latestEntry.datetime.getTime();
                }
            }
        });
        this.assign(sorterRecentEntries);

        this.sorters.active.addFieldComparator('Ratings (Median)', (t1, t2: Tea, dir: SortDirection): number => {
            if (dir === SortDirection.DESC) {
                return t2.ratingMedian - t1.ratingMedian;
            } else {
                return t1.ratingMedian - t2.ratingMedian;
            }
        });

        this.sorters.active.addFieldComparator('Ratings (Average)', (t1, t2: Tea, dir: SortDirection): number => {
            if (dir === SortDirection.DESC) {
                return t2.ratingAvg - t1.ratingAvg;
            } else {
                return t1.ratingAvg - t2.ratingAvg;
            }
        });
    }

    availableFields(): string[] {
        return this.sorters.active.fields.filter(f => !this.sorters.active.assignedFields.includes(f));
    }

    assign(field: string) {
        this.sorters.active.assignField(field, SortDirection.DESC);
    }
}
