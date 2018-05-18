import { Injectable, EventEmitter } from '@angular/core';

import { Tea } from './tea';

export enum FilterFlag { 'UNSET', 'ONLY', 'EXCLUDED' }

export class Filter {
    private strings: Map<string, string[]> = new Map<string, string[]>();
    private flags: Map<string, FilterFlag> = new Map<string, FilterFlag>();
    private matchers: Map<string, any> = new Map<string, any>();
    public changed: EventEmitter = new EventEmitter();

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
