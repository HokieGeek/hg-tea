import { Injectable, EventEmitter } from '@angular/core';

import { Tea } from './tea';

export enum FilterFlag { 'UNSET', 'ONLY', 'EXCLUDED' }

export class Filter {
    static Stored = class {
        public strings: string;
        public flags: string;
    };

    public strings: Map<string, string[]> = new Map<string, string[]>();
    public flags: Map<string, FilterFlag> = new Map<string, FilterFlag>();
    public matchers: Map<string, any> = new Map<string, any>();
    public changed: EventEmitter<any> = new EventEmitter();

    constructor() { }

    addStringField(field: string, matcher: (strings: string[], tea: Tea) => boolean) {
        this.strings.set(field, []);
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
            return this.strings.get(field);
        }
        return null;
    }

    withString(field: string, value: string): Filter {
        if (this.strings.has(field)) {
            this.strings.get(field).push(value);
            this.changed.emit();
        }
        return this;
    }

    withoutString(field: string, value: string): Filter {
        if (this.strings.has(field)) {
            this.strings.set(field, this.strings.get(field).filter(v => v !== value));
            this.changed.emit();
        }
        return this;
    }

    hasStrings(field: string): boolean {
        return this.strings.has(field) && this.strings.get(field).length !== 0;
    }

    get stringFields(): string[] {
        return Array.from(this.strings.keys());
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
                if (this.strings.has(field)) {
                    const strings = this.strings.get(field);
                    if (strings.length !== 0 && !matcher(strings, tea)) {
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

    stringify(): string {
        const s = new Filter.Stored();
        s.strings = JSON.stringify(Array.from(this.strings.entries()));
        s.flags = JSON.stringify(Array.from(this.flags.entries()));
        // console.log('stringify', s.flags);
        return JSON.stringify(s);
    }

    parse(f: string) {
        const s = JSON.parse(f);
        this.strings = new Map<string, string[]>(JSON.parse(s.strings));
        this.flags = new Map<string, FilterFlag>(JSON.parse(s.flags));
        // console.log('parsed', this.flags);
    }
}

export enum SortDirection { 'ASC', 'DESC' }

class SortField {
    constructor(private _name: string, private _comparator: any, private direction: SortDirection) {}

    get name(): string {
        return this._name;
    }

    get comparator(): any {
        return this._comparator;
    }

    get sortDirection(): SortDirection {
        return this.direction;
    }

    set sortDirection(dir: SortDirection) {
        this.direction = dir;
    }

    toggleSortDirection() {
        if (this.direction === SortDirection.ASC) {
            this.direction = SortDirection.DESC;
        } else {
            this.direction = SortDirection.ASC;
        }
    }

}

export class Sorter {
    static Stored = class {
        public fields: string;
        public assignedFields: string;
    };

    public _fields: Map<string, SortField> = new Map<string, SortField>();
    public _assignedFields: string[] = [];
    public changed: EventEmitter<any> = new EventEmitter();

    addFieldComparator(fieldName: string, comparator: (tea1, tea2: Tea, dir: SortDirection) => number) {
        this._fields.set(fieldName, new SortField(fieldName, comparator, SortDirection.DESC));
    }

    assignField(field: string, dir: SortDirection): boolean {
        if (this._fields.has(field)) {
            if (!this._assignedFields.includes(field)) {
                this._assignedFields.push(field);
            }
            this.getField(field).sortDirection = dir;
            this.changed.emit();
            return true;
        } else {
            return false;
        }
    }

    get assignedFields(): string[] {
        return this._assignedFields;
    }

    get fields(): string[] {
        return Array.from(this._fields.keys());
    }

    getField(field: string): SortField {
        if (this._fields.has(field)) {
            return this._fields.get(field);
        } else {
            return null;
        }
    }

    removeField(field: string): boolean {
        if (this._fields.delete(field)) {
            this._assignedFields.splice(this._assignedFields.indexOf(field), 1);
            this.changed.emit();
            return true;
        } else {
            return false;
        }
    }

    getSortDirection(field: string): SortDirection {
        if (this._fields.has(field)) {
            return this.getField(field).sortDirection;
        } else {
            return null;
        }
    }

    toggleSortDirection(field: string) {
        if (this._fields.has(field)) {
            this.getField(field).toggleSortDirection();
            this.changed.emit();
        }
    }

    compare(t1, t2: Tea): number {
        let ret = 0;
        this._assignedFields.forEach((fieldName: string) => {
            if (ret === 0) {
                if (t1 == null && t2 == null) {
                    ret = 0;
                } else if (t1 == null && t2 != null) {
                    ret = 1;
                } else if (t1 != null && t2 == null) {
                    ret = -1;
                } else {
                    const field = this.getField(fieldName);
                    if (field !== null) {
                        ret = field.comparator(t1, t2, field.sortDirection);
                    }
                }
            }
        });
        return ret;
    }

    stringify(): string {
        const s = new Sorter.Stored();
        s.fields = JSON.stringify(Array.from(this._fields));
        s.assignedFields = JSON.stringify(this.assignedFields);
        return JSON.stringify(s);
    }

    parse(s: string) {
        const ss = JSON.parse(s);
        this._fields = new Map<string, SortField>(JSON.parse(ss.fields));
        this._assignedFields = JSON.parse(ss.assignedFields);
    }
}

class View {
    static Stored = class {
        public filter: string;
        public sorter: string;
    };

    constructor(public filter: Filter, public sorter: Sorter) {
        this.addFilters(filter);
        this.addSorters(sorter);
    }

    private addFilters(f: Filter) {
        f.addStringField('Tea Type', (strings: string[], tea: Tea): boolean => {
            return strings.includes(tea.type);
        });

        f.addFlagField('Stocked', (flag: FilterFlag, tea: Tea): boolean => {
            return ((flag === FilterFlag.ONLY && tea.stocked)
                || (flag === FilterFlag.EXCLUDED && !tea.stocked));
        });

        f.addFlagField('With entries', (flag: FilterFlag, tea: Tea): boolean => {
            return ((flag === FilterFlag.ONLY && tea.entries.length > 0)
                || (flag === FilterFlag.EXCLUDED && tea.entries.length === 0));
        });

        f.addStringField('Countries', (strings: string[], tea: Tea): boolean => {
            return strings.includes(tea.country.toLowerCase());
        });

        f.addFlagField('Sample', (flag: FilterFlag, tea: Tea): boolean => {
            return ((flag === FilterFlag.ONLY && tea.sample)
                || (flag === FilterFlag.EXCLUDED && !tea.sample));
        });

        f.addStringField('Purchase location', (strings: string[], tea: Tea): boolean => {
            return strings.includes(tea.purchaselocation.toLowerCase());
        });
    }

    private addSorters(s: Sorter) {
        const sorterRecentEntries = 'Recent entries';
        s.addFieldComparator(sorterRecentEntries, (t1, t2: Tea, dir: SortDirection): number => {
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
        s.assignField(sorterRecentEntries, SortDirection.DESC);

        s.addFieldComparator('Ratings (Median)', (t1, t2: Tea, dir: SortDirection): number => {
            if (dir === SortDirection.DESC) {
                return t2.ratingMedian - t1.ratingMedian;
            } else {
                return t1.ratingMedian - t2.ratingMedian;
            }
        });

        s.addFieldComparator('Ratings (Average)', (t1, t2: Tea, dir: SortDirection): number => {
            if (dir === SortDirection.DESC) {
                return t2.ratingAvg - t1.ratingAvg;
            } else {
                return t1.ratingAvg - t2.ratingAvg;
            }
        });

        s.addFieldComparator('Year', (t1, t2: Tea, dir: SortDirection): number => {
            if (dir === SortDirection.DESC) {
                return t2.year - t1.year;
            } else {
                return t1.year - t2.year;
            }
        });

        s.addFieldComparator('Number of entries', (t1, t2: Tea, dir: SortDirection): number => {
            if (dir === SortDirection.DESC) { // Sort newest to oldest
                return t2.entries.length - t1.entries.length;
            } else { // Sort oldest to newest
                return t1.entries.length - t2.entries.length;
            }
        });

        s.addFieldComparator('Purchase price', (t1, t2: Tea, dir: SortDirection): number => {
            if (dir === SortDirection.DESC) { // Sort newest to oldest
                return t2.purchaseprice - t1.purchaseprice;
            } else { // Sort oldest to newest
                return t1.purchaseprice - t2.purchaseprice;
            }
        });
    }

    stringify(): string {
        const v = new View.Stored();
        v.filter = this.filter.stringify();
        v.sorter = this.sorter.stringify();
        return JSON.stringify(v);
    }

    parse(v: string): View {
        const s = JSON.parse(v);
        this.filter.parse(s.filter);
        this.sorter.parse(s.sorter);
        return this;
    }
}

    /*
class StoredView {
    public filter: string;
    public sorter: string;

    // public filterStrings: string;
    // public filterFlag: string;
    public sorterFields: string;
    public sorterAssignedFields: string;

    parse(obj: object): StoredView {
        this.filter = obj['filter'];
        this.sorter = obj['sorter'];

        // this.filterStrings = obj['filterStrings'];
        // this.filterFlag = obj['filterFlag'];
        // this.sorterFields = obj['sorterFields'];
        // this.sorterAssignedFields = obj['sorterAssignedFields'];
        return this;
    }

    parseView(view: View): StoredView {
        this.filter = view.filter.stringify();
        this.sorter = view.sorter.stringify();

        // this.filterStrings = JSON.stringify(Array.from(view.filter.strings.entries()));
        // this.filterFlag = JSON.stringify(Array.from(view.filter.flags.entries()));
        // this.sorterFields = JSON.stringify(Array.from(view.sorter._fields));
        // this.sorterAssignedFields = JSON.stringify(view.sorter.assignedFields);
        return this;
    }

    createView(): View {
        const v = new View(new Filter(), new Sorter());
        v.filter.parse(this.filter);
        v.sorter.parse(this.sorter);
        // v.filter.strings = new Map<string, string[]>(JSON.parse(this.filterStrings));
        // v.filter.flags = new Map<string, FilterFlag>(JSON.parse(this.filterFlag));
        // v.sorter._fields = new Map<string, SortField>(JSON.parse(this.sorterFields));
        // v.sorter._assignedFields = JSON.parse(this.sorterAssignedFields);
        return v;
    }
}
    */

@Injectable({
    providedIn: 'root',
})
export class ViewService {
    private storageKey = 'hg-tea-views';
    private active: View;
    private views: Map<string, View> = new Map<string, View>();
    public changed: EventEmitter<any> = new EventEmitter();

    constructor() {
        // localStorage.removeItem(this.storageKey);
        this.setActiveView(new View(new Filter(), new Sorter()));
        this.retrieveViews();
    }

    private storeViews(): void {
        console.log('crap', this.active);
        const stored: Map<string, string> = new Map<string, string>();
        console.log('views', this.views);
        this.views.forEach((view, name) => {
            const v: View = view;
            console.log('storeViews', name, view);
            // stored.set(name, new StoredView().parseView(view));
            stored.set(name, v.stringify());
        });
        console.log('storing: ', Array.from(stored.entries()));
        localStorage.setItem(this.storageKey, JSON.stringify(Array.from(stored.entries())));
    }

    private retrieveViews(): void {
        this.views.clear();
        const stored = new Map<string, string>(JSON.parse(localStorage.getItem(this.storageKey)));
        stored.forEach((sv, name) => {
            console.log('sv', sv);
            // this.views.set(name, new StoredView().parse(sv).createView());
            this.views.set(name, new View(new Filter(), new Sorter()).parse(sv));
        });
    }

    private setActiveView(view: View): void {
        this.active = view;
        this.active.filter.changed.subscribe(() => this.changed.emit());
        this.active.sorter.changed.subscribe(() => this.changed.emit());
    }

    save(name: string): boolean {
        this.views.set(name, this.active);
        this.storeViews();
        return true;
    }

    load(name: string): boolean {
        if (this.views.has(name)) {
            console.log('load');
            this.setActiveView(this.views.get(name));
            this.changed.emit();
            return true;
        }
        return false;
    }

    remove(name: string): boolean {
        if (this.views.delete(name)) {
            this.storeViews();
            return true;
        }
        return false;
    }

    get list(): string[] {
        return Array.from(this.views.keys());
    }

    get filter(): Filter {
        return this.active.filter;
    }

    get sorter(): Sorter {
        return this.active.sorter;
    }
}