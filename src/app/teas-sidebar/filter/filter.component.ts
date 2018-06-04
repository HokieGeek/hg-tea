import { Component, OnInit, Input } from '@angular/core';

import { Tea } from '../../tea';
import { ViewService, Filter, FilterFlag } from '../../view.service';

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

    /*
    public filterTeaTypes = 'Tea Type';
    public filterCountries = 'Countries';
    public filterPurchaseLocation = 'Purchase location';
    public filterSample = 'Sample';
    public filterStocked = 'Stocked';
    public filterEntries = 'With entries';
    */

    constructor(public view: ViewService) { }

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

    private teaFields(m: (t) => any): string[] {
        return this.teas.map(m).filter((value, index, self) => self.indexOf(value) === index);
    }

    populateFields() {
        this.teaTypes = this.teaFields(t => t.type.toLowerCase());
        this.countries = this.teaFields(t => t.country.toLowerCase());
        this.purchaseLocations = this.teaFields(t => t.purchaselocation.toLowerCase());
    }

    filteredTeaData(field: string): string[] {
        switch (field) {
        case 'Tea Type': return this.teaTypes;
        case 'Countries': return this.countries;
        case 'Purchase location': return this.purchaseLocations;
        }
    }

    get flags(): string[] {
        return this.view.filter.flagFields;
    }

    get strings(): string[] {
        return this.view.filter.stringFields;
    }
}
