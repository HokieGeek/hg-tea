import { Injectable, EventEmitter } from '@angular/core';

import { Tea } from './tea';

export enum SortDirection { 'ASC', 'DESC' }

export class SortField {
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
    private fields: Map<string, SortField> = new Map<string, SortField>();
    private _assignedFields: string[] = [];
    public changed: EventEmitter<any> = new EventEmitter();

    addFieldComparator(fieldName: string, comparator: (tea1, tea2: Tea, dir: SortDirection) => number) {
        this.fields.set(fieldName, new SortField(fieldName, comparator, SortDirection.DESC));
    }

    assignField(field: string, dir: SortDirection): boolean {
        if (this.fields.has(field)) {
            if (!this._assignedFields.includes(field)) {
                this._assignedFields.push(field);
            }
            this.fields.get(field).sortDirection = dir;
            this.changed.emit();
            return true;
        } else {
            return false;
        }
    }

    getField(field: string): SortField {
        if (this.fields.has(field)) {
            return this.fields.get(field);
        } else {
            return null;
        }
    }

    removeField(field: string): boolean {
        if (this.fields.delete(field)) {
            this.changed.emit();
            return true;
        } else {
            return false;
        }
    }

    get assignedFields(): string[] {
        return this._assignedFields;
    }

    compare(t1, t2: Tea): number {
        let ret = 0;
        this._assignedFields.forEach((fieldName: string) => {
            if (ret === 0) {
                const field = this.fields.get(fieldName);
                ret = field.comparator(t1, t2, field.sortDirection);
            }
        });
        return ret;
    }
}

@Injectable({
  providedIn: 'root'
})
export class SorterService {
    private _activeSorter: Sorter = new Sorter();

    constructor() { }

    get active(): Sorter {
        return this._activeSorter;
    }
}
