import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Tea } from './tea';
import { Entry } from './entry';
import { TeaDbService } from './teadb.service';

@Component({
    selector: 'hg-tea',
    templateUrl: './hgtea.component.html',
    styleUrls: ['hgtea.component.css'],
    providers: [ TeaDbService ]
})
export class HgTeaComponent implements OnInit {
    tea_database: Tea[] = [];
    errorMsg: string = null;
    selectedTab = 'database';

    constructor(private teaDbService: TeaDbService) {}

    ngOnInit() {
        forkJoin(
            this.teaDbService.getTeaData(),
            this.teaDbService.getJournalEntries()
        )
        .subscribe(
            ([tea_data, journal_entries]) => {
                this.tea_database = tea_data;

                const teaIdMap: Map<number, number> = new Map();
                for (let i = this.tea_database.length - 1; i >= 0; i--) {
                    teaIdMap.set(this.tea_database[i].id, i);
                }

                for (const e of journal_entries) {
                    this.tea_database[teaIdMap.get(e.teaId)].addEntry(e);
                }
            },
            err => this.errorMsg = err
        );
    }
}
