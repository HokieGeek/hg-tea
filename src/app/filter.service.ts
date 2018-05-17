import { Injectable } from '@angular/core';

import { Tea } from './tea';

export enum FilterFlag { 'UNSET', 'ONLY', 'EXCLUDED' }

export class Filter {
    private strings: Map<string, string[]> = new Map<string, string[]>();
    private flags: Map<string, FilterFlag> = new Map<string, FilterFlag>();
    private matchers: Map<string, any> = new Map<string, any>();

    constructor() { }

    addStringField(field: string, matcher: (strings: string[], tea: Tea) => boolean) {
        this.strings.set(field, []);
        this.matchers.set(field, matcher);
    }

    addFlagField(field: string, matcher: (flag: FilterFlag, tea: Tea) => boolean) {
        this.flags.set(field, FilterFlag.UNSET);
        this.matchers.set(field, matcher);
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
            console.log(field, value);
            this.strings.get(field).push(value);
        } else {
            console.log('shit');
        }
        return this;
    }

    withoutString(field: string, value: string): Filter {
        if (this.strings.has(field)) {
            this.strings.set(field, this.strings.get(field).filter(v => v !== value));
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
        }
        return this;
    }

    hasFlag(field: string): boolean {
        return this.flags.has(field) && this.flags.get(field) !== FilterFlag.UNSET;
    }

    isMatch(tea: Tea): boolean {
        let isMatch = true;
        this.matchers.forEach((matcher: any, field: string) => {
            if (this.strings.has(field)) {
                if (!matcher(this.strings.get(field), tea)) {
                    isMatch = false;
                }
            } else if (this.flags.has(field)) {
                if (!matcher(this.flags.get(field), tea)) {
                    isMatch = false;
                }
            }
        });

        return isMatch;
    }

        /*
    get isEmpty(): boolean {
        return !this.hasTeaTypes;
    }
        */
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
