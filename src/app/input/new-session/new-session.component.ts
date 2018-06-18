import { Component, OnInit, Input } from '@angular/core';

import { Tea } from '../../tea';

@Component({
    selector: 'hg-new-session',
    templateUrl: './new-session.component.html',
    styleUrls: ['./new-session.component.css']
})
export class NewSessionComponent implements OnInit {
    @Input() public teas: Tea[] = [];

    constructor() { }

    ngOnInit() {
    }

}
