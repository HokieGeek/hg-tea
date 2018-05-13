import { Component, OnInit, Input } from '@angular/core';

import { Tea } from '../tea';

@Component({
    selector: 'hg-teas-sidebar',
    templateUrl: './teas-sidebar.component.html',
    styleUrls: ['./teas-sidebar.component.css']
})
export class TeasSidebarComponent implements OnInit {
    @Input() teas: Tea[];

    constructor() { }

    ngOnInit() {
    }
}
