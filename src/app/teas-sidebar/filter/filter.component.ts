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
    private teaTypes: string[] = [];
    private countries: string[] = [];
    private purchaseLocations: string[] = [];

    public filterTeaTypes = 'Tea Type';
    public filterStocked = 'Stocked';
    public filterEntries = 'With entries';
    public filterCountries = 'Countries';
    public filterSample = 'Sample';
    public filterPurchaseLocation = 'Purchase location';

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

        this.filters.active.addFlagField(this.filterSample, (flag: FilterFlag, tea: Tea): boolean => {
            return ((flag === FilterFlag.ONLY && tea.sample)
                || (flag === FilterFlag.EXCLUDED && !tea.sample));
        });

        this.filters.active.addStringField(this.filterPurchaseLocation, (strings: string[], tea: Tea): boolean => {
            return strings.includes(tea.purchaselocation.toLowerCase());
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

    private teaFields(m: (t) => any): string[] {
        return this.teas.map(m).filter((value, index, self) => self.indexOf(value) === index);
    }

    populateFields() {
        this.teaTypes = this.teaFields(t => t.type.toLowerCase());
        this.countries = this.teaFields(t => t.country.toLowerCase());
        this.purchaseLocations = this.teaFields(t => t.purchaselocation.toLowerCase());
    }
}
