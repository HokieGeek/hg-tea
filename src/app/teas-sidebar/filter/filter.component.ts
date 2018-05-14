import { Component, OnInit, Input } from '@angular/core';

import { Tea } from '../../tea';
import { FilterService, Filter } from '../../filter.service';

@Component({
  selector: 'hg-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
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
