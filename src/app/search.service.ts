import { Injectable } from '@angular/core';

import { Md5 } from 'ts-md5/dist/md5';
import * as lunr from 'lunr';

import { Tea } from './tea';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    public teas: Tea[] = [];

    private hash: any;
    private idx: lunr.Index = null;

    constructor() { }

    private rebuildIndex() {
        const builder = new lunr.Builder();
        builder.ref('id');
        builder.field('name');
        this.teas.forEach(t => builder.add(t));
        this.idx = builder.build();
    }

    private processQuery(query: string): string {
        return query.trim().split(' ').map(word => `${word}* ${word}`).join(' ');
    }

    ingest(teas: Tea[]) {
        const hash = Md5.hashStr(JSON.stringify(teas));
        if (this.hash !== hash) { // only rebuild if it has changed
            this.teas = teas;
            this.hash = hash;
            this.rebuildIndex();
        }
    }

    search(query: string): number[] {
        if (this.idx != null) {
            return this.idx.search(this.processQuery(query)).map(t => +t.ref);
        }
        return [];
    }
}
