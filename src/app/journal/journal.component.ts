import { Component, OnInit, Input } from '@angular/core';

import { Tea } from '../tea';
import { Entry } from '../entry';

@Component({
    selector: 'hg-journal',
    templateUrl: 'journal.component.html',
    styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit {
    @Input() teaId: number;
    @Input() entries: Entry[];
    private isCollapsed = true;

    constructor() { }

    ngOnInit() {
    }

    get sortedEntries() {
        if (this.entries) {
            return this.entries.slice().reverse();
        }
        return [];
    }
}
