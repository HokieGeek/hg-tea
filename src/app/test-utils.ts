export class TestUtils {
    private numRatingValues = 4;
    private maxNumFixins = 11;
    private maxNumSteepingVessels = 9;

    createDummyEntry(): Entry {
        let id = 0;

        let now = new Date();
        let today = (now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear();
        let time = parseInt(now.getHours() + '' + now.getMinutes(), 10);

        let fixins: string;
        for (let i = Math.floor(Math.random() * 2); i >= 0; i--) {
            fixins += Math.floor(Math.random() * this.maxNumFixins);
            fixins += ';';
        }
        fixins = fixins.slice(0, -1);

        return new Entry(
            id, // teaId (HAS TO MATCH ARRAY POS)
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

    createDummyTea(): Tea {
        let id = 0;

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
}
