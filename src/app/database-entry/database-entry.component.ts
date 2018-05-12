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
    private ratingType: ratingTypeEnum = ratingTypeEnum.AVG;

    entriesAvgRating(): number {
        let total = 0;
        for (const entry of this.tea.entries) {
            total += +entry.rating;
        }
        return Math.floor(total / this.tea.entries.length);
    }

    entriesMeanRating(): number {
        const ratings: number[] = [];
        for (const entry of this.tea.entries) {
            ratings.push(+entry.rating);
        }

        return ratings[Math.floor(this.tea.entries.length / 2)];
    }

    entriesRating(): number {
        switch (this.ratingType) {
            case ratingTypeEnum.AVG: return this.entriesAvgRating();
            case ratingTypeEnum.MEAN: return this.entriesMeanRating();
        }
    }
}
