import { Component, Input } from '@angular/core';

import { Tea } from './tea'

@Component({
  selector: 'hg-tea-database',
  templateUrl: 'app/hgtea-database.html',
})

export class HgTeaDatabase {
    @Input()
    teas: Tea[];
}
