import { Component, Input } from '@angular/core';

import { Tea } from '../tea';
import { Entry } from '../entry';
import { PurchaseInfoComponent } from '../purchase-info/purchase-info.component';

@Component({
    selector: 'hg-database-entry',
    templateUrl: 'database-entry.component.html',
    styleUrls: ['database-entry.component.css'],
})

export class DatabaseEntryComponent {
    @Input() tea: Tea;
}
