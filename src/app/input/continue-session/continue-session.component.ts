import { Component, OnInit, Input } from '@angular/core';

import { Tea } from '../../tea';

@Component({
    selector: 'hg-continue-session',
    templateUrl: './continue-session.component.html',
    styleUrls: ['./continue-session.component.css']
})
export class ContinueSessionComponent implements OnInit {
    @Input() public teas: Tea[] = [];

    constructor() { }

    ngOnInit() {
    }

}
