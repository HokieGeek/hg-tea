import { Component, OnInit, Input } from '@angular/core';

import { Tea } from '../tea';

@Component({
  selector: 'hg-teas',
  templateUrl: './teas.component.html',
  styleUrls: ['./teas.component.css']
})
export class TeasComponent implements OnInit {
    @Input() teas: Tea[];

    constructor() { }

    ngOnInit() {
    }
}
