import { Component, Input } from '@angular/core';

import { Tea } from '../tea'

@Component({
    selector: 'hg-tea-database',
    templateUrl: 'hgtea-database.component.html',
    styleUrls: ['./hgtea-database.component.css']
})

export class HgTeaDatabaseComponent {
    @Input() teas: Tea[];
}
