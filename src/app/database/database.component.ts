import { Component, OnInit, Input } from '@angular/core';

import { Tea } from '../tea';

@Component({
    selector: 'hg-database',
    templateUrl: 'database.component.html',
    styleUrls: ['./database.component.css']
})

export class DatabaseComponent implements OnInit {
    @Input() teas: Tea[];

    constructor() { }

    ngOnInit() {
    }

    get sortedTeas() {
        return this.teas.sort((t1, t2) => {
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
