import { Tea } from './tea'
import { Entry } from './entry'

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

        let now = new Date();
        let today = (now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear();
        console.log('>>> today', today, new Date());
        let time = parseInt(now.getHours() + '' + now.getMinutes(), 10);

        let fixins: string;
        for (let i = Math.floor(Math.random() * 2); i >= 0; i--) {
            fixins += Math.floor(Math.random() * this.maxNumFixins);
            fixins += ';';
        }
        fixins = fixins.slice(0, -1);

        return new Entry(
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
    }

    static createDummyTea(id?: number): Tea {
        if (id === undefined) {
            id = this.createRandomId();
        }

        let now = new Date();
        let today = (now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear();
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
            'Yunnan', // region
            (new Date()).getFullYear(), // year
            0, // flush
            'tea.awesome.site', // purchaselocation
            today, // purchasedate
            '99.99', // purchaseprice
            '', // ratings
            'COMMENT', // comments
            [], // pictures
            'China', // country
            '', // leafgrade
            '', // blendedteas
            '', // blendratio
            'Full Beeng', // size
            true , // stocked
            true , // aging
            'loose' // packaging
        );
    }

    static createDummyTeasWithEntries(): TeasWithEntries {
        /*
         * TODO
         * For a random number of teas:
         * - create sequential id
         * - create a random number of entries with that id
         */
        let teasWithEntries = new TeasWithEntries();
        let numTeas = Math.floor(Math.random() * 19); // From 1 - 20 teas
        for (let id = 0; id < numTeas + 1; id++) {
            teasWithEntries.teas.push(this.createDummyTea(id));
            for (let e = Math.floor(Math.random() * 10); e >= 0; e--) {
                teasWithEntries.entries.push(this.createDummyEntry(id));
            }
        }
        return teasWithEntries;
    }
}
