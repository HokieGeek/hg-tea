import { Component, Input } from '@angular/core';
import * as moment from 'moment';

import { Tea, Entry } from '../tea';

import { SteeptimePipe } from '../steeptime.pipe';

@Component({
    selector: 'hg-journal-entry',
    templateUrl: 'journal-entry.component.html',
    styleUrls: ['journal-entry.component.css']
})

export class JournalEntryComponent {
    private _entry: Entry;
    public humanizedDate = '';

    @Input()
    set entry(e: Entry) {
        this._entry = e;
        this.humanizedDate = moment(this._entry.datetime).fromNow();
    }

    get entry(): Entry {
        return this._entry;
    }

    get fixinsStr(): string {
        if (this.entry.fixins != null && this.entry.fixins.length > 0) {
            return this.entry.fixins.join(', ').replace(/, ([^,]*)$/, ', & $1');
        }
        return '';
    }
}
