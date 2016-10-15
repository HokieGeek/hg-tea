import { Component, Input } from '@angular/core';

import { Tea } from './tea'
import { Entry } from './entry'

@Component({
  selector: 'hg-tea-journal',
  templateUrl: 'app/hgtea-journal.html',
  styleUrls: ['app/hgtea-journal.css'],
})

export class HgTeaJournal {
    @Input()
    entries: Entry[];
    @Input()
    teas: Tea[];
}
