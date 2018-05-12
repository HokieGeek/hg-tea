import { Component, OnInit, Input } from '@angular/core';

import { Tea } from '../tea';

@Component({
    selector: 'hg-database',
    templateUrl: 'database.component.html',
    styleUrls: ['./database.component.css']
})

export class DatabaseComponent implements OnInit {
    @Input() teas: Tea[];

    constructor() { }

    ngOnInit() {
    }

    get sortedTeas() {
        return this.teas;
        /*
        if (this.teas) {
            return this.teas.slice().reverse();
        }
        return [];
         */
    }
}
