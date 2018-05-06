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
    journal_entries: Entry[] = [];
    errorMsg: string = null;
    selectedTab = 'journal';

    constructor(private teaDbService: TeaDbService) {}

    ngOnInit() {
        forkJoin(
            this.teaDbService.getTeaData(),
            this.teaDbService.getJournalEntries()
        )
        .subscribe(
            ([tea_data, journal_entries]) => {
                this.tea_database = tea_data;
                this.journal_entries = journal_entries;
            },
            err => this.errorMsg = err
        );
    }
}
