import { Component, OnInit } from '@angular/core';

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
    tea_database: Tea[];
    journal_entries: Entry[];
    errorMsg: string = null;
    mode = 'Observable';

    constructor(private teaDbService: TeaDbService) {}

    ngOnInit() {
        this.getTeaData();
        this.getJournalEntries();
    }

    getTeaData() {
        this.teaDbService.getTeaData().subscribe(
            tea_data => this.tea_database = tea_data,
            err => this.errorMsg = <any>err);
    }

    getJournalEntries() {
        this.teaDbService.getJournalEntries().subscribe(
            journal_entries => this.journal_entries = journal_entries,
            err => this.errorMsg = <any>err);
    }
}
