import { Injectable, EventEmitter } from '@angular/core';

import { Tea } from './tea';

export enum SortDirection { 'ASC', 'DESC' }

export class Sorter {
    private comparators: Map<string, any> = new Map<string, any>();
    public changed: EventEmitter<any> = new EventEmitter();

    addFieldComparator(field: string, comparator: (tea1, tea2: Tea, dir: SortDirection) => boolean) {
        this.comparators.set(field, comparator);
        this.changed.emit();
    }

    comparator(t1, t2: Tea): number {
        return -99;
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
