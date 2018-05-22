import { Injectable, EventEmitter } from '@angular/core';

import { Tea } from './tea';

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
  providedIn: 'root'
})
export class SorterService {
    private _activeSorter: Sorter = new Sorter();

    constructor() { }

    get active(): Sorter {
        return this._activeSorter;
    }
}
