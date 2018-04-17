import { Component, Input } from '@angular/core';

import { Tea } from '../tea'
import { Entry } from '../entry'

@Component({
    selector: 'hg-tea-journal',
    templateUrl: 'hgtea-journal.component.html',
})
export class HgTeaJournal {
    @Input() entries: Entry[];
    @Input() teas: Tea[];

    get reversedEntries() {
        if (this.entries) {
            return this.entries.slice().reverse();
        }
        return [];
    }
}
