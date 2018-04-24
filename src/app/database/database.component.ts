import { Component, Input } from '@angular/core';

import { Tea } from '../tea';

@Component({
    selector: 'database',
    templateUrl: 'database.component.html',
    styleUrls: ['./database.component.css']
})

export class DatabaseComponent {
    @Input() teas: Tea[];
}
