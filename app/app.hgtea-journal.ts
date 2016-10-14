import { Component, Input } from '@angular/core';

import { Tea } from './tea'
import { Entry } from './entry'

@Component({
  selector: 'hg-tea-journal',
  templateUrl: 'app/hgtea-journal.html'
})

export class HgTeaJournal {
    @Input()
    entries: string[];
    @Input()
    teas: string[];
}
