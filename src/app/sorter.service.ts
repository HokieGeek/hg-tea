import { Injectable, EventEmitter } from '@angular/core';

import { Tea } from './tea';

export enum SortDirection { 'ASC', 'DESC' }

export class Sorter {
    private comparators: Map<string, any> = new Map<string, any>();
    private assignedFields: string[] = [];
    public changed: EventEmitter<any> = new EventEmitter();

    addFieldComparator(field: string, comparator: (tea1, tea2: Tea, dir: SortDirection) => number) {
        this.comparators.set(field, comparator);
    }

    assignField(field: string, dir: SortDirection): boolean {
        if (this.comparators.has(field)) {
            this.assignedFields.push(field);
            this.changed.emit();
            return true;
        } else {
            return false;
        }
    }

    // TODO: somewhere along the line, directionality should matter, right?!
    compare(t1, t2: Tea): number {
        let ret = 0;
        this.assignedFields.forEach((field: string) => {
            if (ret === 0) {
                ret = this.comparators.get(field)(t1, t2, SortDirection.ASC);
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
