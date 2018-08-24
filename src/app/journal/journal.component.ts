import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

import { Tea, Entry } from '../tea';

@Component({
    selector: 'hg-journal',
    templateUrl: 'journal.component.html',
    styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit {
    public sortedEntries: Entry[] = [];
    public displayedEntriesEnd = 1;

    @Input()
    set entries(entries: Entry[]) {
        this.sortedEntries = entries.sort((a, b) => moment(b.datetime).diff(moment(a.datetime)));
    }

    constructor() { }

    ngOnInit() {
    }

    get displayedEntries() {
        return this.sortedEntries.slice(0, this.displayedEntriesEnd);
    }

    public allEntries() {
        this.displayedEntriesEnd = this.sortedEntries.length;
    }

    public rollup() {
        this.displayedEntriesEnd = 1;
    }
}
