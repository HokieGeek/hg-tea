import { DebugElement, DebugNode } from '@angular/core';

import { Tea, Entry } from './tea';

export class TeasWithEntries {
    public teas: Tea[] = [];
    public entries: Entry[] = [];
}

export class TestUtils {
    public static numRatingValues = 4;
    public static maxNumFixins = 11;
    public static maxNumSteepingVessels = 9;

    static createRandomId(): number {
        return Math.floor(Math.random()) + 1;
    }

    static createDummyEntry(teaid?: number): Entry {
        if (teaid === undefined) {
            teaid = 0;
        }

        const now = new Date();
        const today = (now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear();
        let hours = now.getHours().toString();
        if (hours.length === 1) {
            hours = '0' + hours;
        }
        let mins = now.getMinutes().toString();
        if (mins.length === 1) {
            mins = '0' + mins;
        }
        const time = parseInt(hours + mins, 10);

        let fixins = '';
        for (let i = Math.floor(Math.random() * 2); i >= 0; i--) {
            fixins += String(Math.floor(Math.random() * this.maxNumFixins)) + ';';
        }
        fixins = fixins.slice(0, -1);

        const entry = new Entry(
            teaid, // teaId (HAS TO MATCH ARRAY POS)
            'COMMENT', // comments
            '12/30/2011 7:49:05', // timestamp
            today, // date
            time, // time
            Math.floor(Math.random() * this.numRatingValues) + 1, // rating
            '', // pictures
            '1m 2s', // steeptime
            Math.floor(Math.random() * this.maxNumSteepingVessels), // steepingvessel_idx
            212, // steeptemperature
            '', // sessioninstance
            fixins // fixins_list
        );

        return entry;
    }

    static createDummyTea(id?: number): Tea {
        if (id === undefined) {
            id = this.createRandomId();
        }

        const now = new Date();
        const today = (now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear();
        // let time = parseInt(now.getHours() + '' + now.getMinutes(), 10);

        /*
        let fixins: string;
        for (let i = Math.floor(Math.random() * 2); i >= 0; i--) {
            fixins += Math.floor(Math.random() * maxNumFixins);
            fixins += ';';
        }
        fixins = fixins.slice(0, -1);
         */

        return new Tea(
            id, // id
            'Foobar', // name
            '12/30/2011 7:49:05', // timestamp
            today, // date
            'Sheng', // type
            'Lincang, Yunnan', // region
            (new Date()).getFullYear(), // year
            0, // flush
            'tea.awesome.site', // purchaselocation
            today, // purchasedate
            (Math.random() * 1000) + Math.random(), // purchaseprice
            'COMMENT', // comments
            [], // pictures
            'China', // country
            '', // leafgrade
            '', // blendedteas
            '', // blendratio
            String((Math.random() * 500) + 1) + 'g', // size
            (Math.random() >= 0.5), // stocked
            (Math.random() >= 0.5), // aging
            0, // packaging
            false // sample
        );
    }

    static createDummyTeasWithEntries(): TeasWithEntries {
        /*
         * TODO
         * For a random number of teas:
         * - create sequential id
         * - create a random number of entries with that id
         */
        const teasWithEntries = new TeasWithEntries();
        const numTeas = Math.floor(Math.random() * 19); // From 1 - 20 teas
        for (let id = 0; id < numTeas + 1; id++) {
            teasWithEntries.teas.push(this.createDummyTea(id));
            for (let e = Math.floor(Math.random() * 10); e >= 0; e--) {
                teasWithEntries.entries.push(this.createDummyEntry(id));
            }
        }
        return teasWithEntries;
    }

    static filterTextAndCommentNodes(nodes: DebugNode[]): DebugNode[] {
        const filtered: DebugNode[] = [];

        nodes.forEach(node => {
            if (node.nativeNode.nodeName !== '#text' && node.nativeNode.nodeName !== '#comment') {
                filtered.push(node);
            }
        });

        return filtered;
    }

    static filterDebugNodes(nodes: DebugNode[]): DebugElement[] {
        const filtered: DebugElement[] = [];

        nodes.forEach(node => {
            if (node instanceof DebugElement) {
                filtered.push(node as DebugElement);
            }
        });

        return filtered;
    }
}
