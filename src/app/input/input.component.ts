import { Component, OnInit } from '@angular/core';

import { Tea } from '../tea';
import { TeaDbService } from '../teadb.service';

import { TestUtils } from '../test-utils';

@Component({
    selector: 'hg-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.css'],
    providers: [ TeaDbService ]
})
export class InputComponent implements OnInit {
    public teas: Tea[] = [];
    errorMsg: string = null;

    constructor(private teaDbService: TeaDbService) {}

    ngOnInit() {
        // this.tea_database = TestUtils.createDummyTeasWithEntries();
        this.teaDbService.teasWithEntries.subscribe(
            teas => this.teas = teas,
            err => this.errorMsg = err
        );
    }
}
