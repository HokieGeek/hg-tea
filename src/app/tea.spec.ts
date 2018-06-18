import { Tea, Entry, SteepingVessels, TeaFixins } from './tea';

describe('tea entry', () => {
    const numRatingValues = 4;
    const maxNumFixins = 11;
    const maxNumSteepingVessels = 10;

    const id = Math.floor(Math.random()) + 1;

    const now = new Date();
    const date = (now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear();
    const timestamp = '12/30/2011 7:49:05';

    describe('tea', () => {
        const name = 'Foobar';
        const teatype = 'Sheng';
        const region = 'Yunnan';
        const year = (new Date()).getFullYear();
        const flush_idx = 0;
        const purchaseLocation = 'tea.awesome.site';
        const purchaseDate = date;
        const purchasePrice = 99.99;
        const comments = 'COMMENT';
        const pictures = [];
        const country = 'China';
        const leafgrade = '';
        const blendedteas = '';
        const blendratio = '';
        const size = '250g';
        const stocked = true ;
        const aging = true ;
        const packaging_idx = 0;
        const sample = false;

        it('should create', () => {
            const tea = new Tea(
                id,
                name,
                timestamp,
                date,
                teatype,
                region,
                year,
                flush_idx,
                purchaseLocation,
                purchaseDate,
                purchasePrice,
                comments,
                pictures,
                country,
                leafgrade,
                blendedteas,
                blendratio,
                size,
                stocked,
                aging,
                packaging_idx,
                sample
            );

            expect(tea).toBeTruthy();
        });

        it('values should match those passed to constructor', () => {
            const tea = new Tea(
                id,
                name,
                timestamp,
                date,
                teatype,
                region,
                year,
                flush_idx,
                purchaseLocation,
                purchaseDate,
                purchasePrice,
                comments,
                pictures,
                country,
                leafgrade,
                blendedteas,
                blendratio,
                size,
                stocked,
                aging,
                packaging_idx,
                sample
            );

            expect(tea.id).toBe(id);
            expect(tea.name).toBe(name);
            expect(tea.timestamp).toBe(timestamp);
            expect(tea.date).toBe(date);
            expect(tea.type).toBe(teatype);
            expect(tea.region).toBe(region);
            expect(tea.year).toBe(year);
            expect(tea.flush_idx).toBe(flush_idx); // TODO
            expect(tea.purchaselocation).toBe(purchaseLocation);
            expect(tea.purchasedate).toBe(purchaseDate);
            expect(tea.purchaseprice).toBe(purchasePrice);
            expect(tea.comments).toBe(comments);
            expect(tea.pictures).toBe(pictures);
            expect(tea.country).toBe(country);
            expect(tea.leafgrade).toBe(leafgrade);
            expect(tea.blendedteas).toBe(blendedteas);
            expect(tea.blendratio).toBe(blendratio);
            expect(tea.size).toBe(size);
            expect(tea.stocked).toBe(stocked);
            expect(tea.aging).toBe(aging);
            expect(tea.packaging_idx).toBe(packaging_idx); // TODO
        });
    });

    describe('entry', () => {
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
            fixins += String(Math.floor(Math.random() * maxNumFixins)) + ';';
        }
        fixins = fixins.slice(0, -1);

        const comments = 'COMMENT';
        const rating = Math.floor(Math.random() * numRatingValues) + 1;
        const entryPictures = '';
        const steeptime = '1m 2s';
        const steepingvessel = Math.floor(Math.random() * maxNumSteepingVessels);
        const steeptemperature = 212;
        const sessioninstance = '';
        const sessionclosed = true;

        console.log('dummy date = ', date);
        console.log('dummy time = ', time);

        const val = new Entry(
            id, // (HAS TO MATCH ARRAY POS)
            comments,
            timestamp,
            date,
            time,
            rating,
            entryPictures,
            steeptime,
            steepingvessel,
            steeptemperature,
            sessioninstance,
            sessionclosed,
            fixins
        );

        it('should create', () => {
            expect(val).toBeTruthy();
        });

        it('values should match those passed to constructor', () => {
            expect(val.teaId).toBe(id);
            expect(val.comments).toBe(comments);
            expect(val.timestamp).toBe(timestamp);
            expect(val.date).toBe(date);
            expect(val.time).toBe(time);
            expect(val.rating).toBe(rating);
            expect(val.pictures).toBe(entryPictures);
            expect(val.steeptime).toBe(steeptime);
            expect(val.steepingvessel_idx).toBe(steepingvessel);
            expect(val.steeptemperature).toBe(steeptemperature);
            expect(val.sessioninstance).toBe(sessioninstance);
            expect(val.fixins_list).toBe(fixins);
        });

        it('check steeping vessel getter returns expected value', () => {
            expect(val.steepingvessel).toBe(SteepingVessels[val.steepingvessel_idx]); // TODO: could be better
        });

        it('check fixins getter returns expected value', () => {
            const list = val.fixins.replace(/ and /g, ', ').split(', ');
            for (let f = list.length - 1; f >= 0; f--) {
                let found = false;
                for (const fixin in TeaFixins) {
                    if (list[f] === fixin) {
                        found = true;
                    }
                }
                expect(found).toBe(true);
            }
        });

        it('check datetime getter returns expected value', () => {
            const dt = val.datetime;
            console.log('dt = ', dt);
            const hasDate = (dt.getMonth() + 1) + '/' + dt.getDate() + '/' + dt.getFullYear();

            let h = now.getHours().toString();
            if (h.length === 1) {
                h = '0' + h;
            }
            let m = now.getMinutes().toString();
            if (m.length === 1) {
                m = '0' + m;
            }
            const hasTime = parseInt(h + m, 10);

            expect(hasDate).toBe(date);
            expect(hasTime).toBe(time);
        });
    });
});
