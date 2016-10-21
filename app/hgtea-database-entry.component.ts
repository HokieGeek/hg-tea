import { Component, Input } from '@angular/core';

import { Tea } from './tea'

@Component({
    moduleId: module.id,
    selector: 'hg-tea-database-entry',
    templateUrl: 'hgtea-database-entry.html',
    styleUrls: ['hgtea-database-entry.css'],
})

export class HgTeaDatabaseEntry {
    @Input()
    tea: Tea;
}
