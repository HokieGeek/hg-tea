import { Component, OnInit, Input } from '@angular/core';

import { Tea } from '../tea';
import { FilterService, Filter } from '../filter.service';

@Component({
    selector: 'hg-teas-sidebar',
    templateUrl: './teas-sidebar.component.html',
    styleUrls: ['./teas-sidebar.component.css']
})
export class TeasSidebarComponent implements OnInit {
    private _teas: Tea[];

    private teaTypes: string[] = null;

    constructor(private filters: FilterService) { }

    ngOnInit() {
    }

    get teas(): Tea[] {
        return this._teas;
    }

    @Input()
    set teas(_teas) {
        this._teas = _teas;
        this.populateFields();
    }

    populateFields() {
        this.teaTypes = this.teas.map(t => t.type.toLowerCase()).filter((value, index, self) => self.indexOf(value) === index);
    }
}
