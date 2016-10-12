import { Component, Input } from '@angular/core';

@Component({
  selector: 'hg-tea-journal-entry',
  templateUrl: 'app/hgtea-journal-entry.html',
  styleUrls: ['app/hgtea-journal-entry.css']
})

export class HgTeaJournalEntry {
    @Input()
    entry: string;
    @Input()
    tea: string;
}
