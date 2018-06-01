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
        const sorterRecentEntries = 'Recent entries';
        this.view.sorter.addFieldComparator(sorterRecentEntries, (t1, t2: Tea, dir: SortDirection): number => {
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

        this.view.sorter.addFieldComparator('Ratings (Median)', (t1, t2: Tea, dir: SortDirection): number => {
            if (dir === SortDirection.DESC) {
                return t2.ratingMedian - t1.ratingMedian;
            } else {
                return t1.ratingMedian - t2.ratingMedian;
            }
        });

        this.view.sorter.addFieldComparator('Ratings (Average)', (t1, t2: Tea, dir: SortDirection): number => {
            if (dir === SortDirection.DESC) {
                return t2.ratingAvg - t1.ratingAvg;
            } else {
                return t1.ratingAvg - t2.ratingAvg;
            }
        });

        this.view.sorter.addFieldComparator('Year', (t1, t2: Tea, dir: SortDirection): number => {
            if (dir === SortDirection.DESC) {
                return t2.year - t1.year;
            } else {
                return t1.year - t2.year;
            }
        });

        this.view.sorter.addFieldComparator('Number of entries', (t1, t2: Tea, dir: SortDirection): number => {
            if (dir === SortDirection.DESC) { // Sort newest to oldest
                return t2.entries.length - t1.entries.length;
            } else { // Sort oldest to newest
                return t1.entries.length - t2.entries.length;
            }
        });

        this.view.sorter.addFieldComparator('Purchase price', (t1, t2: Tea, dir: SortDirection): number => {
            if (dir === SortDirection.DESC) { // Sort newest to oldest
                return t2.purchaseprice - t1.purchaseprice;
            } else { // Sort oldest to newest
                return t1.purchaseprice - t2.purchaseprice;
            }
        });
    }

    availableFields(): string[] {
        return this.view.sorter.fields.filter(f => !this.view.sorter.assignedFields.includes(f));
    }

    assign(field: string) {
        this.view.sorter.assignField(field, SortDirection.DESC);
    }
}
