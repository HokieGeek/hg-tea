import { Component, OnInit, Input } from '@angular/core';

import { Tea } from '../tea';
import { FilterService, Filter } from '../filter.service';
import { SorterService } from '../sorter.service';

@Component({
  selector: 'hg-teas',
  templateUrl: './teas.component.html',
  styleUrls: ['./teas.component.css'],
  providers: [ FilterService, SorterService ]
})
export class TeasComponent implements OnInit {
    @Input() public teas: Tea[];

    constructor(public filters: FilterService, public sorters: SorterService) { }

    ngOnInit() {
    }
}
