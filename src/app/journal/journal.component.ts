import { Component, Input } from '@angular/core';

import { Tea } from '../tea';
import { Entry } from '../entry';

@Component({
    selector: 'hg-journal',
    templateUrl: 'journal.component.html',
    styleUrls: ['./journal.component.css']
})
export class JournalComponent {
    @Input() entries: Entry[];
    @Input() teas: Tea[];

    get reversedEntries() {
        if (this.entries) {
            return this.entries.slice().reverse();
        }
        return [];
    }
}
