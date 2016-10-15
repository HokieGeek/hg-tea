import { Component } from '@angular/core';

import { Tea } from './tea'
import { Entry } from './entry'

@Component({
  selector: 'hg-tea',
  templateUrl: 'app/hgtea.html'
})

export class HgTea {
    tea_database: Tea[];
    journal_entries: Entry[];
    constructor() {
        this.tea_database=[{id: 0, name: "A"},
                           {id: 1, name: "B"},
                           {id: 2, name: "C"},
        ]
        this.journal_entries=[{teaId: 0, comments: "Comment 0"},
                              {teaId: 1, comments: "Comment 1"},
                              {teaId: 2, comments: "Comment 2"}
        ]
    }
}
