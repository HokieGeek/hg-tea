import { Component, OnInit, Input } from '@angular/core';

import { Tea } from '../../tea';

@Component({
    selector: 'hg-basic-info',
    templateUrl: './basic-info.component.html',
    styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {
    @Input() tea: Tea;

    constructor() { }

    ngOnInit() {
    }

}
