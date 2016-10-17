import { Component, Input } from '@angular/core';

import { Tea } from './tea'
import { Entry } from './entry'

import { NaturalLanguageDatePipe } from './natural-language-date-pipe'

@Component({
    selector: 'hg-tea-journal-entry',
    templateUrl: 'app/hgtea-journal-entry.html',
    styleUrls: ['app/hgtea-journal-entry.css'],
    providers: [ NaturalLanguageDatePipe ],
})

export class HgTeaJournalEntry {
    arr:Array<number>;
    @Input()
    entry: Entry;
    @Input()
    tea: Tea;
}
