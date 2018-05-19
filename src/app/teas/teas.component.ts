import { Component, OnInit, Input } from '@angular/core';

import { Tea } from '../tea';
import { FilterService, Filter } from '../filter.service';

@Component({
  selector: 'hg-teas',
  templateUrl: './teas.component.html',
  styleUrls: ['./teas.component.css']
})
export class TeasComponent implements OnInit {
    @Input() public teas: Tea[];

    constructor(public filters: FilterService) { }

    ngOnInit() {
    }
}
