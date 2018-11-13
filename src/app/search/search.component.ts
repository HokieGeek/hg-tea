import { Component, OnInit, Input } from '@angular/core';

import { ViewFields, ViewService } from '../view.service';
import { SearchService } from '../search.service';

@Component({
    selector: 'hg-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    @Input() transparent: boolean;

    private queryValue = '';

    get query(): string {
        return this.queryValue;
    }

    set query(value: string) {
        this.queryValue = value;
        this.apply();
    }

    constructor(public view: ViewService, private search: SearchService) { }

    ngOnInit() {
    }

    private get searchResults(): number[] {
        return this.query.length > 0 ? this.search.search(this.query) : [];
    }

    apply() {
        this.view.filter.clearNumbers(ViewFields.filterTeaIds);
        this.view.filter.withNumbers(ViewFields.filterTeaIds, this.searchResults);
        this.view.apply();
    }

    clear() {
        this.queryValue = '';
        this.view.filter.clearNumbers(ViewFields.filterTeaIds);
        this.view.apply();
    }
}
