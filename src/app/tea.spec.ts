import { Tea, TeaBuilder, Entry, EntryBuilder, SteepingVessels, TeaFixins } from './tea';

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
        const flush = 'FLUSH';
        const purchaseLocation = 'tea.awesome.site';
        const purchaseDate = now;
        const purchasePrice = 99.99;
        const comments = 'COMMENT';
        const pictures = [];
        const country = 'China';
        const leafgrade = '';
        const blendedteas = '';
        const blendratio = '';
        const size = 250;
        const stocked = true ;
        const aging = true ;
        const packaging_idx = 0;
        const sample = false;

        it('should create', () => {
            const tea = new TeaBuilder()
                .id(id)
                .name(name)
                .timestamp(timestamp)
                .date(now)
                .type(teatype)
                .region(region)
                .year(year)
                .flush(flush)
                .purchaselocation(purchaseLocation)
                .purchasedate(purchaseDate)
                .purchaseprice(purchasePrice)
                .comments(comments)
                .pictures(pictures)
                .country(country)
                .leafgrade(leafgrade)
                .blendedteas(blendedteas)
                .blendratio(blendratio)
                .size(size)
                .stocked(stocked)
                .aging(aging)
                .packaging_idx(packaging_idx)
                .sample(sample)
                .build();

            expect(tea).toBeTruthy();
        });

        it('values should match those passed to constructor', () => {
            const tea = new TeaBuilder()
                .id(id)
                .name(name)
                .timestamp(timestamp)
                .date(now)
                .type(teatype)
                .region(region)
                .year(year)
                .flush(flush)
                .purchaselocation(purchaseLocation)
                .purchasedate(purchaseDate)
                .purchaseprice(purchasePrice)
                .comments(comments)
                .pictures(pictures)
                .country(country)
                .leafgrade(leafgrade)
                .blendedteas(blendedteas)
                .blendratio(blendratio)
                .size(size)
                .stocked(stocked)
                .aging(aging)
                .packaging_idx(packaging_idx)
                .sample(sample)
                .build();

            expect(tea.id).toBe(id);
            expect(tea.name).toBe(name);
            expect(tea.timestamp).toBe(timestamp);
            expect(tea.date).toBe(now);
            expect(tea.type).toBe(teatype);
            expect(tea.region).toBe(region);
            expect(tea.year).toBe(year);
            expect(tea.flush).toBe(flush); // TODO
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

        const fixins = [];
        for (let i = Math.floor(Math.random() * 3); i >= 0; i--) {
            fixins.push(TeaFixins[Math.floor(Math.random() * maxNumFixins)]);
        }

        const comments = 'COMMENT';
        const rating = Math.floor(Math.random() * numRatingValues) + 1;
        const entryPictures = [];
        const steeptime = 62;
        const steepingvessel = Math.floor(Math.random() * maxNumSteepingVessels);
        const steeptemperature = 212;
        const sessioninstance = '';
        const sessionclosed = true;

        console.log('dummy date = ', date);
        console.log('dummy time = ', time);

        const val = new EntryBuilder()
            .teaId(id)
            .comments(comments)
            .timestamp(timestamp)
            .datetime(now)
            .rating(rating)
            .pictures(entryPictures)
            .steeptime(steeptime)
            .steepingvessel_idx(steepingvessel)
            .steeptemperature(steeptemperature)
            .sessioninstance(sessioninstance)
            .sessionclosed(sessionclosed)
            .fixins(fixins)
            .build();

        it('should create', () => {
            expect(val).toBeTruthy();
        });

        it('values should match those passed to constructor', () => {
            expect(val.teaId).toBe(id);
            expect(val.comments).toBe(comments);
            expect(val.timestamp).toBe(timestamp);
            expect(val.datetime.getTime()).toBe(now.getTime());
            expect(val.rating).toBe(rating);
            expect(val.pictures).toBe(entryPictures);
            expect(val.steeptime).toBe(steeptime);
            expect(val.steepingvessel_idx).toBe(steepingvessel);
            expect(val.steeptemperature).toBe(steeptemperature);
            expect(val.sessioninstance).toBe(sessioninstance);
            expect(val.fixins).toBe(fixins);
        });

        it('check steeping vessel getter returns expected value', () => {
            expect(val.steepingvessel).toBe(SteepingVessels[val.steepingvessel_idx]); // TODO: could be better
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
