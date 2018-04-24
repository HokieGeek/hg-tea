import { Component, Input } from '@angular/core';

import { Tea } from '../tea';

@Component({
    selector: 'database-entry',
    templateUrl: 'database-entry.component.html',
    styleUrls: ['database-entry.component.css'],
})

export class DatabaseEntryComponent {
    @Input() tea: Tea;
}
