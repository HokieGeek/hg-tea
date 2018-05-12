import { Component, Input } from '@angular/core';

import { Tea } from '../tea';
import { Entry } from '../entry';

import { NaturalLanguageDatePipe } from '../natural-language-date-pipe';

@Component({
    selector: 'hg-journal-entry',
    templateUrl: 'journal-entry.component.html',
    styleUrls: ['journal-entry.component.css'],
    providers: [ NaturalLanguageDatePipe ],
})

export class JournalEntryComponent {
    @Input() entry: Entry;
}
