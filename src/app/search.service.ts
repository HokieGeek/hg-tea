import { Injectable } from '@angular/core';

import { Tea } from './tea';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    public teas: Tea[] = [];

    constructor() { }

    ingest(teas: Tea[]) {
        this.teas = teas;
        console.log(this.teas.length);
    }

    search(query: string): number[] {
        console.log(query);
        return [2, 42];
    }
}
