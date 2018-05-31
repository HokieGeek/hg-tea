import { Component, OnInit, Input } from '@angular/core';

import { Tea, Entry } from '../tea';

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
