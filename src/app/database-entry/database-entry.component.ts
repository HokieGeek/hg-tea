import { Component, Input } from '@angular/core';

import { Tea } from '../tea';
import { Entry } from '../entry';
import { PurchaseInfoComponent } from '../purchase-info/purchase-info.component';

enum ratingTypeEnum {'AVG', 'MEAN'}

@Component({
    selector: 'hg-database-entry',
    templateUrl: 'database-entry.component.html',
    styleUrls: ['database-entry.component.css'],
})

export class DatabaseEntryComponent {
    @Input() tea: Tea;
    private ratingType: ratingTypeEnum = ratingTypeEnum.MEAN;

    entriesRating(): number {
        switch (this.ratingType) {
            case ratingTypeEnum.AVG: return this.tea.ratingAvg;
            case ratingTypeEnum.MEAN: return this.tea.ratingMean;
        }
    }
}
