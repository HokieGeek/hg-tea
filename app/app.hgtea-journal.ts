import { Component, Input } from '@angular/core';

@Component({
  selector: 'hg-tea-journal',
  templateUrl: 'app/hgtea-journal.html'
})

export class HgTeaJournal {
    @Input()
    entries: string[];
}
