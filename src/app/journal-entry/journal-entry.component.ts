import { Component, Input } from '@angular/core';
import * as moment from 'moment';

import { Tea, Entry } from '../tea';

@Component({
    selector: 'hg-journal-entry',
    templateUrl: 'journal-entry.component.html',
    styleUrls: ['journal-entry.component.css']
})

export class JournalEntryComponent {
    @Input() entry: Entry;

    get fixinsStr(): string {
        if (this.entry.fixins != null && this.entry.fixins.length > 0) {
            return this.entry.fixins.join(', ').replace(/, ([^,]*)$/, ', & $1');
        }
        return '';
    }

    get humanizedDate(): string {
        return moment(this.entry.datetime).fromNow();
    }
}
