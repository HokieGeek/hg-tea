import { Injectable, EventEmitter } from '@angular/core';

import { Tea } from './tea';

export enum FilterFlag { 'UNSET', 'ONLY', 'EXCLUDED' }

export class Filter {
    private strings: Map<string, string[]> = new Map<string, string[]>();
    private flags: Map<string, FilterFlag> = new Map<string, FilterFlag>();
    private matchers: Map<string, any> = new Map<string, any>();
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
    private _fields: Map<string, SortField> = new Map<string, SortField>();
    private _assignedFields: string[] = [];
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
}

@Injectable({
    providedIn: 'root',
})
export class ViewService {
    private activeFilter: Filter = new Filter();
    private activeSorter: Sorter = new Sorter();

    constructor() { }

    get filter(): Filter {
        return this.activeFilter;
    }

    get sorter(): Sorter {
        return this.activeSorter;
    }
}
