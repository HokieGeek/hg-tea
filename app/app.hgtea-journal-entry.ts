import { Component, Input } from '@angular/core';

@Component({
  selector: 'hg-tea-journal-entry',
  templateUrl: 'app/hgtea-journal-entry.html'
})

export class HgTeaJournalEntry {
    @Input()
    entry: string;
}
