import { Component, Input } from '@angular/core';

import { Tea } from './tea'

@Component({
    selector: 'hg-tea-database-entry',
    templateUrl: 'app/hgtea-database-entry.html',
    styleUrls: ['app/hgtea-database-entry.css'],
})

export class HgTeaDatabaseEntry {
    @Input()
    tea: Tea;
}
