import { Component, OnInit, Input } from '@angular/core';

import { Tea } from '../tea';
import { TeaDbService } from '../teadb.service';
import { ViewService } from '../view.service';

import { TestUtils } from '../test-utils';

@Component({
  selector: 'hg-teas',
  templateUrl: './teas.component.html',
  styleUrls: ['./teas.component.css'],
  providers: [ TeaDbService ]
})
export class TeasComponent implements OnInit {
    @Input() public teas: Tea[] = [];
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
