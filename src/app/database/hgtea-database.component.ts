import { Component, Input } from '@angular/core';

import { Tea } from '../tea'

@Component({
    // moduleId: module.id,
    selector: 'hg-tea-database',
    templateUrl: 'hgtea-database.component.html',
})

export class HgTeaDatabase {
    @Input()
    teas: Tea[];
}
