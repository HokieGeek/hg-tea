import { Component, Input } from '@angular/core';

import { Tea } from '../tea'

@Component({
    selector: 'hg-tea-database-entry',
    templateUrl: 'hgtea-database-entry.component.html',
    styleUrls: ['hgtea-database-entry.component.css'],
})

export class HgTeaDatabaseEntryComponent {
    @Input() tea: Tea;
}
