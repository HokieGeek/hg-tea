import { Component, OnInit, Input } from '@angular/core';

import { Tea } from '../../tea';
import { FilterService, Filter, FilterFlag } from '../../filter.service';
// export enum FilterField { 'TeaTypes', 'IsStocked', 'HasEntries' }

@Component({
  selector: 'hg-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
    private _teas: Tea[];
    private teaTypes: string[] = [];

    private filterTeaTypes = 'TeaTypes';
    private filterStocked = 'Stocked';
    private filterEntries = 'Entries';

    constructor(private filters: FilterService) { }

    ngOnInit() {
        this.filters.active.addStringField(this.filterTeaTypes, (strings: string[], tea: Tea): boolean => {
            return strings.includes(tea.type);
        });

        this.filters.active.addFlagField(this.filterStocked, (flag: FilterFlag, tea: Tea): boolean => {
            return ((flag === FilterFlag.ONLY && tea.stocked)
                || (flag === FilterFlag.EXCLUDED && !tea.stocked));
        });

        this.filters.active.addFlagField(this.filterEntries, (flag: FilterFlag, tea: Tea): boolean => {
            return ((flag === FilterFlag.ONLY && tea.entries.length > 0)
                || (flag === FilterFlag.EXCLUDED && tea.entries.length === 0));
        });
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
