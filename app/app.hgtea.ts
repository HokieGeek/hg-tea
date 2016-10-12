import { Component } from '@angular/core';

@Component({
  selector: 'hg-tea',
  templateUrl: 'app/hgtea.html'
})

export class HgTea {
    journal_entries: string[];
    tea_database: string[];
    constructor() {
        this.journal_entries=['Entry 4', 'entry 2', 'Entry 3']
        this.tea_database=['Tea A', 'Tea B', 'Tea C']
    }
}
