import { Component, OnInit } from '@angular/core';

import { Tea, Entry } from './tea';
import { ViewService } from './view.service';
import { SearchService } from './search.service';

@Component({
    selector: 'hg-tea',
    templateUrl: './hgtea.component.html',
    styleUrls: ['hgtea.component.css'],
    providers: [ SearchService, ViewService ]
})
export class HgTeaComponent implements OnInit {
    selectedTab = 'database';

    constructor(public view: ViewService) {}

    ngOnInit() {
    }
}
