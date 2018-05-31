import { Component, OnInit } from '@angular/core';

import { Tea, Entry } from './tea';
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
        this.teaDbService.getTeasWithEntries().subscribe(
            teas => this.tea_database = teas,
            err => this.errorMsg = err
        );
    }
}
