import { Tea } from './tea';

describe('tea entry', () => {
    const id = Math.floor(Math.random()) + 1;

    const now = new Date();
    const today = (now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear();

    const name = 'Foobar';
    const timestamp = '12/30/2011 7:49:05';
    const date = today;
    const teatype = 'Sheng';
    const region = 'Yunnan';
    const year = (new Date()).getFullYear();
    const flush_idx = 0;
    const purchaseLocation = 'tea.awesome.site';
    const purchaseDate = today;
    const purchasePrice = '99.99';
    const ratings = '';
    const comments = 'COMMENT';
    const pictures = [];
    const country = 'China';
    const leafgrade = '';
    const blendedteas = '';
    const blendratio = '';
    const size = 'Full Beeng';
    const stocked = true ;
    const aging = true ;
    const packaging = 'loose';

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
            ratings,
            comments,
            pictures,
            country,
            leafgrade,
            blendedteas,
            blendratio,
            size,
            stocked,
            aging,
            packaging
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
            ratings,
            comments,
            pictures,
            country,
            leafgrade,
            blendedteas,
            blendratio,
            size,
            stocked,
            aging,
            packaging
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
        expect(tea.ratings).toBe(ratings);
        expect(tea.comments).toBe(comments);
        expect(tea.pictures).toBe(pictures);
        expect(tea.country).toBe(country);
        expect(tea.leafgrade).toBe(leafgrade);
        expect(tea.blendedteas).toBe(blendedteas);
        expect(tea.blendratio).toBe(blendratio);
        expect(tea.size).toBe(size);
        expect(tea.stocked).toBe(stocked);
        expect(tea.aging).toBe(aging);
        expect(tea.packaging).toBe(packaging);
    });
});
