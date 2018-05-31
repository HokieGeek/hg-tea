import { Component, Input } from '@angular/core';

import { Tea, Entry } from '../tea';
import { PurchaseInfoComponent } from '../purchase-info/purchase-info.component';

enum ratingTypeEnum {'AVG', 'MEDIAN'}

@Component({
    selector: 'hg-database-entry',
    templateUrl: 'database-entry.component.html',
    styleUrls: ['database-entry.component.css'],
})

export class DatabaseEntryComponent {
    @Input() tea: Tea;
    private ratingType: ratingTypeEnum = ratingTypeEnum.MEDIAN;

    entriesRating(): number {
        switch (this.ratingType) {
            case ratingTypeEnum.AVG: return this.tea.ratingAvg;
            case ratingTypeEnum.MEDIAN: return this.tea.ratingMedian;
        }
    }
}
