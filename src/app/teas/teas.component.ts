import { Component, OnInit, Input } from '@angular/core';

import { Tea } from '../tea';
import { ViewService } from '../view.service';

@Component({
  selector: 'hg-teas',
  templateUrl: './teas.component.html',
  styleUrls: ['./teas.component.css'],
  providers: [ ViewService ]
})
export class TeasComponent implements OnInit {
    @Input() public teas: Tea[];

    constructor(public view: ViewService) { }

    ngOnInit() {
    }
}
