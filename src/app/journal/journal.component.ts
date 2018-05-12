import { Component, Input } from '@angular/core';

import { Tea } from '../tea';
import { Entry } from '../entry';

@Component({
    selector: 'hg-journal',
    templateUrl: 'journal.component.html',
    styleUrls: ['./journal.component.css']
})
export class JournalComponent {
    @Input() teaId: number;
    @Input() entries: Entry[];
    private expanded = false;

    get sortedEntries() {
        if (this.entries) {
            return this.entries.slice().reverse();
        }
        return [];
    }
}
