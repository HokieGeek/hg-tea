import { Component, Input } from '@angular/core';

import { Tea } from './tea'
import { Entry } from './entry'

import { NaturalLanguageDatePipe } from './natural-language-date-pipe'

@Component({
    // moduleId: module.id,
    selector: 'hg-tea-journal-entry',
    templateUrl: 'hgtea-journal-entry.component.html',
    styleUrls: ['hgtea-journal-entry.component.css'],
    providers: [ NaturalLanguageDatePipe ],
})

export class HgTeaJournalEntry {
    @Input()
    entry: Entry;
    @Input()
    tea: Tea;
}
