import { Injectable } from '@angular/core';

import { Tea } from './tea';

export class Filter {

    private _teaTypes: string[] = [];

    constructor() { }

    get teaTypes(): string[] {
        return this._teaTypes;
    }

    withTeaType(teaType: string): Filter {
        this._teaTypes.push(teaType);
        return this;
    }

    withoutTeaType(teaType: string): Filter {
        this._teaTypes = this._teaTypes.filter(t => t !== teaType);
        return this;
    }

    isMatch(tea: Tea): boolean {
        if (this._teaTypes.length > 0 && !this._teaTypes.includes(tea.type)) {
            return false;
        }
        return true;
    }
}

@Injectable({
    providedIn: 'root'
})
export class FilterService {
    private _activeFilter: Filter = new Filter();

    constructor() {}

    get active(): Filter {
        return this._activeFilter;
    }
}
