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

    constructor(private filters: FilterService) { }

    ngOnInit() {
        this.filters.active.addStringField(this.filterTeaTypes, (types: string[], tea: Tea): boolean => {
            if (types.length !== 0 && !types.includes(tea.type)) {
                return false;
            }
            return true;
        });

        this.filters.active.addFlagField(this.filterStocked, (stocked: FilterFlag, tea: Tea): boolean => {
            if ((stocked === FilterFlag.ONLY && tea.stocked !== true)
                || (stocked === FilterFlag.EXCLUDED && tea.stocked === true)) {
                return false;
            }
            return true;
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
