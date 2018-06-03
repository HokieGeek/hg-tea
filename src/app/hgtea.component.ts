import { Component, OnInit } from '@angular/core';

import { Tea, Entry } from './tea';
import { TeaDbService } from './teadb.service';
import { ViewService } from './view.service';

import { TestUtils } from './test-utils';

@Component({
    selector: 'hg-tea',
    templateUrl: './hgtea.component.html',
    styleUrls: ['hgtea.component.css'],
    providers: [ TeaDbService, ViewService ]
})
export class HgTeaComponent implements OnInit {
    tea_database: Tea[] = [];
    errorMsg: string = null;
    selectedTab = 'database';

    constructor(private teaDbService: TeaDbService) {}

    ngOnInit() {
        this.tea_database = TestUtils.createDummyTeasWithEntries();
        /*
        this.teaDbService.teasWithEntries.subscribe(
            teas => this.tea_database = teas,
            err => this.errorMsg = err
        );
        */
    }
}
