import { Component, OnInit, Input } from '@angular/core';

import { Tea } from '../../tea';

@Component({
    selector: 'hg-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
    @Input() tea: Tea;

    constructor() { }

    ngOnInit() {
    }
}
