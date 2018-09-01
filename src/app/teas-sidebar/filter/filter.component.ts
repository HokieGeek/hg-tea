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
    private regions: string[] = [];

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
        return this.teas.map(m)
            .filter((value, index, self) => self.indexOf(value) === index && value.length > 0)
            .sort((a, b) => a.localeCompare(b));
    }

    populateFields() {
        this.teaTypes = this.teaFields(t => t.type.toLowerCase().trim());
        this.countries = this.teaFields(t => t.country.toLowerCase().trim());
        this.purchaseLocations = this.teaFields(t => t.purchaselocation.toLowerCase().trim());
        this.regions = this.teaFields(t => t.region.toLowerCase().trim());
    }

    filteredTeaData(field: string): string[] {
        switch (field) {
        case 'Tea Type': return this.teaTypes;
        case 'Countries': return this.countries;
        case 'Purchase location': return this.purchaseLocations;
        case 'Region': return this.regions;
        }
    }

    get flags(): string[] {
        return this.view.filter.flagFields;
    }

    get strings(): string[] {
        return this.view.filter.stringFields;
    }
}
