import { DebugElement, DebugNode } from '@angular/core';

import { Tea, TeaBuilder, Entry, EntryBuilder } from './tea';

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

        const fixins: number[] = [];
        for (let i = Math.floor(Math.random() * 2); i >= 0; i--) {
            fixins.push(Math.floor(Math.random() * this.maxNumFixins));
        }

        const entry = new EntryBuilder()
            .teaId(teaid)
            .comments('COMMENT')
            .timestamp('12/30/2011 7:49:05')
            .date(today)
            .time(time)
            .rating(Math.floor(Math.random() * this.numRatingValues) + 1)
            .pictures([])
            .steeptime('1m 2s')
            .steepingvessel_idx(Math.floor(Math.random() * this.maxNumSteepingVessels))
            .steeptemperature(212)
            .sessioninstance('')
            .sessionclosed(true)
            .fixins_list(fixins)
            .build();

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

        return new TeaBuilder()
            .id(id)
            .name('Foobar')
            .timestamp('12/30/2011 7:49:05')
            .date(today)
            .type('Sheng')
            .region('Lincang, Yunnan')
            .year((new Date()).getFullYear())
            .flush_idx(0)
            .purchaselocation('tea.awesome.site')
            .purchasedate(today)
            .purchaseprice((Math.random() * 1000) + Math.random())
            .comments('COMMENT')
            .pictures([])
            .country('China')
            .leafgrade('')
            .blendedteas('')
            .blendratio('')
            .size(String((Math.random() * 500) + 1) + 'g')
            .stocked((Math.random() >= 0.5))
            .aging((Math.random() >= 0.5))
            .packaging_idx(0)
            .sample(false)
            .build();
    }

    static createDummyTeasWithEntries(): Tea[] {
        /*
         * TODO
         * For a random number of teas:
         * - create sequential id
         * - create a random number of entries with that id
         */
        const teas: Tea[] = [];
        const numTeas = Math.floor(Math.random() * 19); // From 1 - 20 teas
        for (let id = 0; id < numTeas + 1; id++) {
            const tea = this.createDummyTea(id);
            for (let e = Math.floor(Math.random() * 10); e >= 0; e--) {
                tea.addEntry(this.createDummyEntry(id));
            }
            teas.push(tea);
        }
        return teas;
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
