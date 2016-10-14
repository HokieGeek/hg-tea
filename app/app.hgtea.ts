import { Component } from '@angular/core';

import { Tea } from './tea'
import { Entry } from './entry'

@Component({
  selector: 'hg-tea',
  templateUrl: 'app/hgtea.html'
})

export class HgTea {
    journal_entries: string[];
    tea_database: string[];
    constructor() {
        this.tea_database=['Tea A', 'Tea B', 'Tea C']
        this.journal_entries=['Entry 4', 'entry 2', 'Entry 3']
    }
}
