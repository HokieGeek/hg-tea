import { Injectable, EventEmitter } from '@angular/core';
import * as moment from 'moment';

import { Tea } from './tea';

export enum FilterFlag { 'UNSET', 'ONLY', 'EXCLUDED' }

class StringsFilter {
    public values: string[] = [];
    public match = true;
}

export class ViewFields {
    public static sorterRecentEntries    = 'Recent entries';
    public static sorterName             = 'Name';
    public static sorterRatingsMedian    = 'Ratings (Median)';
    public static sorterRatingsAverage   = 'Ratings (Average)';
    public static sorterYear             = 'Year';
    public static sorterNumberOfEntries  = 'Number of entries';
    public static sorterPurchasePrice    = 'Purchase price';
    public static sorterPurchaseDate     = 'Purchase date';
    public static sorterPricePerCup      = 'Price per cup';

    public static filterTeaIds           = 'Tea IDs';
    public static filterTeaType          = 'Tea Type';
    public static filterStocked          = 'Stocked';
    public static filterWithEntries      = 'With entries';
    public static filterCountries        = 'Countries';
    public static filterSample           = 'Sample';
    public static filterPurchaseLocation = 'Purchase location';
    public static filterRegion           = 'Region';
    public static filterAging            = 'Aging';
}

export class Filter {
    static Stored = class {
        public strings: string;
        public numbers: string;
        public flags: string;
    };

    // TODO: not public
    public strings: Map<string, StringsFilter> = new Map<string, StringsFilter>();
    public numbers: Map<string, number[]> = new Map<string, number[]>();
    public flags: Map<string, FilterFlag> = new Map<string, FilterFlag>();
    public matchers: Map<string, any> = new Map<string, any>();
    public changed: EventEmitter<any> = new EventEmitter();

    constructor() { }

    addStringField(field: string, matcher: (strings: string[], match: boolean, tea: Tea) => boolean) {
        this.strings.set(field, new StringsFilter());
        this.matchers.set(field, matcher);
        this.changed.emit();
    }

    addNumberField(field: string, matcher: (numbers: number[], tea: Tea) => boolean) {
        this.numbers.set(field, []);
        this.matchers.set(field, matcher);
        this.changed.emit();
    }

    addFlagField(field: string, matcher: (flag: FilterFlag, tea: Tea) => boolean) {
        this.flags.set(field, FilterFlag.UNSET);
        this.matchers.set(field, matcher);
        this.changed.emit();
    }

    // String fields
    stringField(field: string): string[] {
        if (this.strings.has(field)) {
            return this.strings.get(field).values;
        }
        return null;
    }

    withString(field: string, value: string): Filter {
        return this.withStrings(field, [value]);
    }

    withStrings(field: string, value: string[]): Filter {
        if (this.strings.has(field)) {
            const strings = this.strings.get(field);
            strings.values = strings.values.concat(value);
            this.strings.set(field, strings);
            this.changed.emit();
        }
        return this;
    }

    withoutString(field: string, value: string): Filter {
        return this.withoutStrings(field, [value]);
    }

    withoutStrings(field: string, value: string[]): Filter {
        if (this.strings.has(field)) {
            const strings = this.strings.get(field);
            strings.values = strings.values.filter(v => !value.includes(v));
            this.strings.set(field, strings);
            this.changed.emit();
        }
        return this;
    }

    hasStrings(field: string): boolean {
        return this.strings.has(field) && this.strings.get(field).values.length !== 0;
    }

    clearStrings(field: string) {
        if (this.strings.has(field)) {
            this.strings.set(field, new StringsFilter());
        }
    }

    get stringFields(): string[] {
        return Array.from(this.strings.keys());
    }

    toggleStringMatchingType(field: string) {
        if (this.strings.has(field)) {
            this.strings.get(field).match = !this.strings.get(field).match;
            this.changed.emit();
        }
    }

    isStringMatching(field: string): boolean {
        return this.strings.has(field) && this.strings.get(field).match;
    }

    setStringMatching(field: string, match: boolean) {
        if (this.strings.has(field)) {
            this.strings.get(field).match = match;
            this.changed.emit();
        }
    }

    // Number fields
    numberField(field: string): number[] {
        if (this.numbers.has(field)) {
            return this.numbers.get(field);
        }
        return null;
    }

    withNumber(field: string, value: number): Filter {
        return this.withNumbers(field, [value]);
    }

    withNumbers(field: string, value: number[]): Filter {
        if (this.numbers.has(field)) {
            this.numbers.set(field, this.numbers.get(field).concat(value));
            this.changed.emit();
        }
        return this;
    }

    withoutNumber(field: string, value: number): Filter {
        return this.withoutNumbers(field, [value]);
    }

    withoutNumbers(field: string, value: number[]): Filter {
        if (this.numbers.has(field)) {
            this.numbers.set(field, this.numbers.get(field).filter(v => !value.includes(v)));
            this.changed.emit();
        }
        return this;
    }

    hasNumbers(field: string): boolean {
        return this.numbers.has(field) && this.numbers.get(field).length !== 0;
    }

    clearNumbers(field: string) {
        if (this.numbers.has(field)) {
            this.numbers.set(field, []);
        }
    }

    get numberFields(): string[] {
        return Array.from(this.numbers.keys());
    }

    // FilterFlag fields
    private flagCompare(field: string, state: FilterFlag): boolean {
        if (this.flags.has(field)) {
            return this.flags.get(field) === state;
        }
        return false;
    }

    flagOnly(field: string): boolean {
        return this.flagCompare(field, FilterFlag.ONLY);
    }

    flagExcluded(field: string): boolean {
        return this.flagCompare(field, FilterFlag.EXCLUDED);
    }

    withFlag(field: string, flag: FilterFlag): Filter {
        if (this.flags.has(field)) {
            this.flags.set(field, flag);
            this.changed.emit();
        }
        return this;
    }

    withFlagOnly(field: string): Filter {
        return this.withFlag(field, FilterFlag.ONLY);
    }

    withFlagExcluded(field: string): Filter {
        return this.withFlag(field, FilterFlag.EXCLUDED);
    }

    withoutFlag(field: string): Filter {
        if (this.flags.has(field)) {
            this.flags.set(field, FilterFlag.UNSET);
            this.changed.emit();
        }
        return this;
    }

    hasFlag(field: string): boolean {
        return this.flags.has(field) && this.flags.get(field) !== FilterFlag.UNSET;
    }

    get flagFields(): string[] {
        return Array.from(this.flags.keys());
    }

    isMatch(tea: Tea): boolean {
        let isMatch = true;
        this.matchers.forEach((matcher: any, field: string) => {
            if (isMatch) {
                if (this.numbers.has(field)) {
                    const numbers = this.numbers.get(field);
                    if (numbers.length !== 0 && !matcher(numbers, tea)) {
                        isMatch = false;
                    }
                } else if (this.strings.has(field)) {
                    const strings = this.strings.get(field);
                    if (strings.values.length !== 0 && !matcher(strings.values, strings.match, tea)) {
                        isMatch = false;
                    }
                } else if (this.flags.has(field)) {
                    const flag = this.flags.get(field);
                    if (flag !== FilterFlag.UNSET && !matcher(flag, tea)) {
                        isMatch = false;
                    }
                }
            }
        });
        return isMatch;
    }

    clone(): Filter {
        const f: Filter = new Filter();
        f.strings = new Map<string, StringsFilter>(this.strings);
        f.numbers = new Map<string, number[]>(this.numbers);
        f.flags = new Map<string, FilterFlag>(this.flags);
        f.matchers = new Map<string, any>(this.matchers);
        return f;
    }

    stringify(): string {
        const s = new Filter.Stored();
        s.strings = JSON.stringify(Array.from(this.strings.entries()));
        s.numbers = JSON.stringify(Array.from(this.numbers.entries()));
        s.flags = JSON.stringify(Array.from(this.flags.entries()));
        return JSON.stringify(s);
    }

    parse(f: string) {
        const s = JSON.parse(f);
        this.strings = new Map<string, StringsFilter>(JSON.parse(s.strings));
        this.numbers = new Map<string, number[]>(JSON.parse(s.numbers));
        this.flags = new Map<string, FilterFlag>(JSON.parse(s.flags));
    }
}

export enum SortDirection { 'ASC', 'DESC' }

export class Sorter {
    static Stored = class {
        public assignedFields: string;
    };

    // TODO: assignedFields needs to include the SortDirection
    public _fields: Map<string, any> = new Map<string, any>();
    public _assignedFields: Map<string, SortDirection> = new Map<string, SortDirection>();
    public changed: EventEmitter<any> = new EventEmitter();

    addFieldComparator(fieldName: string, comparator: (tea1, tea2: Tea, dir: SortDirection) => number) {
        if (fieldName !== null && comparator !== null) {
            this._fields.set(fieldName, comparator);
        }
    }

    assignField(field: string, dir: SortDirection): boolean {
        if (this._fields.has(field)) {
            this._assignedFields.set(field, dir);
            this.changed.emit();
            return true;
        } else {
            return false;
        }
    }

    get assignedFields(): string[] {
        return Array.from(this._assignedFields.keys());
    }

    get fields(): string[] {
        return Array.from(this._fields.keys());
    }

    getField(field: string): any {
        if (this._fields.has(field)) {
            return this._fields.get(field);
        } else {
            return null;
        }
    }

    removeField(field: string): boolean {
        if (this._fields.delete(field)) {
            this._assignedFields.delete(field);
            this.changed.emit();
            return true;
        } else {
            return false;
        }
    }

    getSortDirection(field: string): SortDirection {
        if (this._assignedFields.has(field)) {
            return this._assignedFields.get(field);
        } else {
            return null;
        }
    }

    toggleSortDirection(field: string) {
        if (this._assignedFields.has(field)) {
            if (this._assignedFields.get(field) === SortDirection.ASC) {
                this._assignedFields.set(field, SortDirection.DESC);
            } else {
                this._assignedFields.set(field, SortDirection.ASC);
            }
            this.changed.emit();
        }
    }

    compare(t1, t2: Tea): number {
        let ret = 0;
        this._assignedFields.forEach((dir: SortDirection, fieldName: string) => {
            if (ret === 0) {
                if (t1 == null && t2 == null) {
                    ret = 0;
                } else if (t1 == null && t2 != null) {
                    ret = 1;
                } else if (t1 != null && t2 == null) {
                    ret = -1;
                } else {
                    const comparator = this.getField(fieldName);
                    if (comparator !== null) {
                        ret = comparator(t1, t2, dir);
                    }
                    // ret = this.getField(fieldName)(t1, t2, dir);
                }
            }
        });
        return ret;
    }

    clone(): Sorter {
        const s: Sorter = new Sorter();
        s._assignedFields = new Map<string, SortDirection>(this._assignedFields);
        s._fields = new Map<string, any>(this._fields);
        return s;
    }

    stringify(): string {
        const s = new Sorter.Stored();
        s.assignedFields = JSON.stringify(Array.from(this._assignedFields.entries()));
        return JSON.stringify(s);
    }

    parse(s: string) {
        const ss = JSON.parse(s);
        this._assignedFields = new Map<string, SortDirection>(JSON.parse(ss.assignedFields));
    }
}

class View {
    static Stored = class {
        public name: string;
        public filter: string;
        public sorter: string;
    };

    public changed: EventEmitter<any> = new EventEmitter();

    static parse(v: string): View {
        const parsed = new View();
        const s = JSON.parse(v);
        parsed.name = s.name;
        parsed.filter.parse(s.filter);
        parsed.sorter.parse(s.sorter);
        return parsed;
    }

    static parseFromUrlParams(filterParams, sorterParams: string) {
        const parsed = new View();

        const f = new Map<string, string>(filterParams.split(';').map((v) => v.split(':')));
        f.forEach((v, k) => {
            const typeAndName = k.split('>');
            switch (typeAndName[0]) {
                case 'n':
                    v.split(',').forEach((num) => parsed.filter.withNumber(typeAndName[1], +num));
                    break;
                case 'z':
                case 'Z':
                    parsed.filter.setStringMatching(typeAndName[1], typeAndName[0] === 'z');
                    v.split(',').forEach((str) => parsed.filter.withString(typeAndName[1], str));
                    break;
                case 'g':
                    parsed.filter.withFlag(typeAndName[1], +v);
                    break;
            }
        });

        sorterParams.split(';').map((v) => v.split(':')).forEach((v) => parsed.sorter.assignField(v[0], +v[1]));

        return parsed;
    }

    constructor(public name?: string, public filter?: Filter, public sorter?: Sorter) {
        if (this.filter === undefined) {
            this.filter = new Filter();
            this.addFilters(this.filter);
        }
        if (this.sorter === undefined) {
            this.sorter = new Sorter();
            this.addSorters(this.sorter);
        }

        this.filter.changed.subscribe(() => this.changed.emit());
        this.sorter.changed.subscribe(() => this.changed.emit());
    }

    private addFilters(f: Filter) {
        f.addNumberField(ViewFields.filterTeaIds, (numbers: number[], tea: Tea): boolean => {
            return numbers.includes(tea.id);
        });

        f.addStringField(ViewFields.filterTeaType, (strings: string[], match: boolean, tea: Tea): boolean => {
            if (match) {
                return strings.includes(tea.type.toLowerCase().trim());
            } else {
                return !strings.includes(tea.type.toLowerCase().trim());
            }
        });

        f.addFlagField(ViewFields.filterStocked, (flag: FilterFlag, tea: Tea): boolean => {
            return ((flag === FilterFlag.ONLY && tea.stocked)
                || (flag === FilterFlag.EXCLUDED && !tea.stocked));
        });

        f.addFlagField(ViewFields.filterWithEntries, (flag: FilterFlag, tea: Tea): boolean => {
            return ((flag === FilterFlag.ONLY && tea.entries.length > 0)
                || (flag === FilterFlag.EXCLUDED && tea.entries.length === 0));
        });

        f.addStringField(ViewFields.filterCountries, (strings: string[], match: boolean, tea: Tea): boolean => {
            if (match) {
                return strings.includes(tea.country.toLowerCase().trim());
            } else {
                return !strings.includes(tea.country.toLowerCase().trim());
            }
        });

        f.addFlagField(ViewFields.filterSample, (flag: FilterFlag, tea: Tea): boolean => {
            return ((flag === FilterFlag.ONLY && tea.sample)
                || (flag === FilterFlag.EXCLUDED && !tea.sample));
        });

        f.addFlagField(ViewFields.filterAging, (flag: FilterFlag, tea: Tea): boolean => {
            return ((flag === FilterFlag.ONLY && tea.aging)
                || (flag === FilterFlag.EXCLUDED && !tea.aging));
        });

        f.addStringField(ViewFields.filterPurchaseLocation, (strings: string[], match: boolean, tea: Tea): boolean => {
            if (match) {
                return strings.includes(tea.purchaselocation.toLowerCase().trim());
            } else {
                return !strings.includes(tea.purchaselocation.toLowerCase().trim());
            }
        });

        f.addStringField(ViewFields.filterRegion, (strings: string[], match: boolean, tea: Tea): boolean => {
            if (match) {
                return strings.includes(tea.region.toLowerCase().trim());
            } else {
                return !strings.includes(tea.region.toLowerCase().trim());
            }
        });
    }

    private addSorters(s: Sorter) {
        s.addFieldComparator(ViewFields.sorterRecentEntries, (t1, t2: Tea, dir: SortDirection): number => {
            if (t1.latestEntry == null && t2.latestEntry == null) {
                return 0;
            } else if (t1.latestEntry == null && t2.latestEntry != null) {
                // TODO: make use of dir
                return 1;
            } else if (t1.latestEntry != null && t2.latestEntry == null) {
                // TODO: make use of dir
                return -1;
            } else {
                if (dir === SortDirection.DESC) { // Sort newest to oldest
                    return t2.latestEntry.datetime.getTime() - t1.latestEntry.datetime.getTime();
                } else { // Sort oldest to newest
                    return t1.latestEntry.datetime.getTime() - t2.latestEntry.datetime.getTime();
                }
            }
        });

        s.addFieldComparator(ViewFields.sorterName, (t1, t2: Tea, dir: SortDirection): number => {
            if (dir === SortDirection.DESC) {
                return t2.name.localeCompare(t1.name);
            } else {
                return t1.name.localeCompare(t2.name);
            }
        });

        s.addFieldComparator(ViewFields.sorterRatingsMedian, (t1, t2: Tea, dir: SortDirection): number => {
            if (dir === SortDirection.DESC) {
                return t2.ratingMedian - t1.ratingMedian;
            } else {
                return t1.ratingMedian - t2.ratingMedian;
            }
        });

        s.addFieldComparator(ViewFields.sorterRatingsAverage, (t1, t2: Tea, dir: SortDirection): number => {
            if (dir === SortDirection.DESC) {
                return t2.ratingAvg - t1.ratingAvg;
            } else {
                return t1.ratingAvg - t2.ratingAvg;
            }
        });

        s.addFieldComparator(ViewFields.sorterYear, (t1, t2: Tea, dir: SortDirection): number => {
            if (dir === SortDirection.DESC) {
                return t2.year - t1.year;
            } else {
                return t1.year - t2.year;
            }
        });

        s.addFieldComparator(ViewFields.sorterNumberOfEntries, (t1, t2: Tea, dir: SortDirection): number => {
            if (dir === SortDirection.DESC) { // Sort newest to oldest
                return t2.entries.length - t1.entries.length;
            } else { // Sort oldest to newest
                return t1.entries.length - t2.entries.length;
            }
        });

        s.addFieldComparator(ViewFields.sorterPurchasePrice, (t1, t2: Tea, dir: SortDirection): number => {
            if (dir === SortDirection.DESC) { // Sort newest to oldest
                return t2.purchaseprice - t1.purchaseprice;
            } else { // Sort oldest to newest
                return t1.purchaseprice - t2.purchaseprice;
            }
        });

        s.addFieldComparator(ViewFields.sorterPurchaseDate, (t1, t2: Tea, dir: SortDirection): number => {
            if (dir === SortDirection.DESC) { // Sort newest to oldest
                return moment.utc(t2.purchasedate).diff(moment.utc(t1.purchasedate));
            } else { // Sort oldest to newest
                return moment.utc(t1.purchasedate).diff(moment.utc(t2.purchasedate));
            }
        });

        s.addFieldComparator(ViewFields.sorterPricePerCup, (t1, t2: Tea, dir: SortDirection): number => {
            if (dir === SortDirection.DESC) { // Sort newest to oldest
                return t2.pricePerCup - t1.pricePerCup;
            } else { // Sort oldest to newest
                return t1.pricePerCup - t2.pricePerCup;
            }
        });
    }

    clone(): View {
        return new View(this.name, this.filter.clone(), this.sorter.clone());
    }

    stringify(): string {
        const v = new View.Stored();
        v.name = this.name;
        v.filter = this.filter.stringify();
        v.sorter = this.sorter.stringify();
        return JSON.stringify(v);
    }

    private generateFiltersUrlParams(): string {
        let params = '';
        this.filter.strings.forEach((v, k) => {
            if (v.values.length > 0) {
                params += v.match ? 'z' : 'Z';
                params += '>' + k + ':' + v.values.join(',') + ';';
            }
        });
        this.filter.numbers.forEach((v, k) => {
            if (v.length > 0) {
                params += 'n>' + k + ':' + v.join(',') + ';';
            }
        });
        this.filter.flags.forEach((v, k) => {
            if (v !== FilterFlag.UNSET) {
                params += 'g>' + k + ':' + v + ';';
            }
        });

        if (params.length > 0) {
            params = 'f=' + params.replace(/;$/, '');
        }

        return params;
    }

    private generateSortersUrlParams(): string {
        let params = '';

        this.sorter.assignedFields.forEach((v) => {
            params += v + ':' + this.sorter.getSortDirection(v) + ';';
        });

        if (params.length > 0) {
            params = 's=' + params.replace(/;$/, '');
        }

        return params;
    }

    generateUrlParams(): string {
        let params = this.generateFiltersUrlParams();
        const sortersParam = this.generateSortersUrlParams();

        if (params.length > 0 && sortersParam.length > 0) {
            params += '&';
        }
        params += sortersParam;

        return encodeURI(params);
    }
}

@Injectable({
    providedIn: 'root',
})
export class ViewService {
    private storageKey = 'hg-tea-views';
    private active: View;
    private defaultViews: Map<string, View> = new Map<string, View>();
    private userViews: Map<string, View> = new Map<string, View>();
    public changed: EventEmitter<boolean> = new EventEmitter();
    public applied: EventEmitter<any> = new EventEmitter();

    private sidebarEnabled = false;
    private searchEnabled = false;

    constructor() {
        // localStorage.removeItem(this.storageKey);
        this.clear();
        this.createDefaultViews();
        this.retrieveStoredViews();
    }

    get isSidebarEnabled(): boolean {
        return this.sidebarEnabled;
    }

    set enableSidebar(enabled: boolean) {
        this.sidebarEnabled = enabled;
    }

    get isSearchEnabled(): boolean {
        return this.searchEnabled;
    }

    set enableSearch(enabled: boolean) {
        this.searchEnabled = enabled;
    }

    private storeViews(): void {
        const stored: Map<string, string> = new Map<string, string>();
        this.userViews.forEach((view, name) => {
            const v: View = view;
            stored.set(name, v.stringify());
        });
        localStorage.setItem(this.storageKey, JSON.stringify(Array.from(stored.entries())));
    }

    private retrieveStoredViews(): void {
        this.userViews.clear();
        const stored = new Map<string, string>(JSON.parse(localStorage.getItem(this.storageKey)));
        stored.forEach((sv, name) => {
            const v = View.parse(sv);
            // console.log('retrieved view:', v);
            this.userViews.set(name, v);
            // this.views.set(name, new View().parse(sv));
        });
    }

    private createDefaultViews(): void {
        // ToDrink
        const toDrink = new View('Untried');
        toDrink.sorter.assignField(ViewFields.sorterPurchaseDate, SortDirection.ASC);
        toDrink.filter.withFlagOnly(ViewFields.filterStocked);
        toDrink.filter.withFlagExcluded(ViewFields.filterWithEntries);
        toDrink.filter.withFlagExcluded(ViewFields.filterAging);
        this.defaultViews.set(toDrink.name, toDrink);

        // Next sample
        const nextSample = new View('Next sample');
        nextSample.sorter.assignField(ViewFields.sorterNumberOfEntries, SortDirection.ASC);
        nextSample.sorter.assignField(ViewFields.sorterPurchaseDate, SortDirection.ASC);
        nextSample.sorter.assignField(ViewFields.sorterRatingsAverage, SortDirection.DESC);
        nextSample.sorter.assignField(ViewFields.sorterRecentEntries, SortDirection.DESC);
        nextSample.filter.withFlagOnly(ViewFields.filterStocked);
        nextSample.filter.withFlagOnly(ViewFields.filterSample);
        nextSample.filter.withFlagExcluded(ViewFields.filterAging);
        this.defaultViews.set(nextSample.name, nextSample);

        // Been a while
        const beenAWhile = new View('Been a while');
        beenAWhile.sorter.assignField(ViewFields.sorterRecentEntries, SortDirection.ASC);
        beenAWhile.filter.withFlagOnly(ViewFields.filterStocked);
        beenAWhile.filter.withFlagOnly(ViewFields.filterWithEntries);
        beenAWhile.filter.withFlagExcluded(ViewFields.filterAging);
        this.defaultViews.set(beenAWhile.name, beenAWhile);

        // Aging
        const aging = new View('Aging');
        aging.sorter.assignField(ViewFields.sorterPurchaseDate, SortDirection.ASC);
        aging.filter.withFlagOnly(ViewFields.filterAging);
        this.defaultViews.set(aging.name, aging);
    }

    private setActiveView(view: View): void {
        if (this.active != null) {
            this.active.changed.unsubscribe();
        }
        this.active = view;
        // console.log('active view:', this.active);
        this.active.changed.subscribe(() => this.changed.emit(false));
    }

    save(): boolean {
        if (this.active.name.length > 0) {
            // console.log('current view:', this.active);
            this.userViews.set(this.active.name, this.active.clone());
            this.storeViews();
            return true;
        }
        return false;
    }

    private loadView(view: View): boolean {
        this.setActiveView(view);
        this.changed.emit(false);
        return true;
    }

    loadDefaultView(name: string): boolean {
        if (!this.defaultViews.has(name)) {
            return false;
        }
        return this.loadView(this.defaultViews.get(name).clone());
    }

    loadUserView(name: string): boolean {
        if (!this.userViews.has(name)) {
            return false;
        }
        return this.loadView(this.userViews.get(name).clone());
    }

    removeUserView(name: string): boolean {
        if (this.userViews.delete(name)) {
            this.storeViews();
            return true;
        }
        return false;
    }

    get name(): string {
        return this.active.name;
    }

    set name(n: string) {
        this.active.name = n;
        this.changed.emit(false);
    }

    get listUserViews(): string[] {
        return Array.from(this.userViews.keys());
    }

    get listDefaultViews(): string[] {
        return Array.from(this.defaultViews.keys());
    }

    get filter(): Filter {
        return this.active.filter;
    }

    get sorter(): Sorter {
        return this.active.sorter;
    }

    generateUrlParams(): string {
        return this.active.generateUrlParams();
    }

    loadViewFromUrlParams(filterParams, sorterParams: string) {
        this.setActiveView(View.parseFromUrlParams(filterParams, sorterParams));
        // this.changed.emit(true);
        this.applied.emit();
    }

    clear(): void {
        const v = new View('');
        v.sorter.assignField(ViewFields.sorterRecentEntries, SortDirection.DESC);
        this.setActiveView(v);
        this.changed.emit(true);
        this.applied.emit();
    }

    apply(): void {
        this.applied.emit();
    }
}
