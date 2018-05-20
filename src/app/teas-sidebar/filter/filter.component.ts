import { Component, OnInit, Input } from '@angular/core';

import { Tea } from '../../tea';
import { FilterService, Filter, FilterFlag } from '../../filter.service';

@Component({
  selector: 'hg-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
    private _teas: Tea[];
    private _teaTypes: string[] = [];
    private _countries: string[] = [];

    public filterTeaTypes = 'TeaTypes';
    public filterStocked = 'Stocked';
    public filterEntries = 'Entries';
    public filterCountries = 'Countries';

    constructor(public filters: FilterService) { }

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

        this.filters.active.addStringField(this.filterCountries, (strings: string[], tea: Tea): boolean => {
            return strings.includes(tea.country.toLowerCase());
        });
    }

    get teaTypes(): string[] {
        return this._teaTypes;
    }

    get countries(): string[] {
        return this._countries;
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
        this._teaTypes = this.teas.map(t => t.type.toLowerCase()).filter((value, index, self) => self.indexOf(value) === index);
        this._countries = this.teas.map(t => t.country.toLowerCase()).filter((value, index, self) => self.indexOf(value) === index);
    }
}
