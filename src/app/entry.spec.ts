import { Entry } from './entry';

describe('entry', () => {
    const numRatingValues = 4;
    const maxNumFixins = 11;
    const maxNumSteepingVessels = 9;

    const now = new Date();
    const teaid = 0;
    const date = (now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear();
    const time = parseInt(now.getHours() + '' + now.getMinutes(), 10);

    let fixins: string;
    for (let i = Math.floor(Math.random() * 2); i >= 0; i--) {
        fixins += Math.floor(Math.random() * maxNumFixins);
        fixins += ';';
    }
    fixins = fixins.slice(0, -1);

    const comments = 'COMMENT';
    const timestamp = '12/30/2011 7:49:05';
    const rating = Math.floor(Math.random() * numRatingValues) + 1;
    const pictures = '';
    const steeptime = '1m 2s';
    const steepingvessel = Math.floor(Math.random() * maxNumSteepingVessels);
    const steeptemperature = 212;
    const sessioninstance = '';

    const val = new Entry(
        teaid, // (HAS TO MATCH ARRAY POS)
        comments,
        timestamp,
        date,
        time,
        rating,
        pictures,
        steeptime,
        steepingvessel,
        steeptemperature,
        sessioninstance,
        fixins
    );

    it('should create', () => {
        expect(val).toBeTruthy();
    });

    it('values should match those passed to constructor', () => {
        expect(val.teaId).toBe(teaid);
        expect(val.comments).toBe(comments);
        expect(val.timestamp).toBe(timestamp);
        expect(val.date).toBe(date);
        expect(val.time).toBe(time);
        expect(val.rating).toBe(rating);
        expect(val.pictures).toBe(pictures);
        expect(val.steeptime).toBe(steeptime);
        expect(val.steepingvessel_idx).toBe(steepingvessel);
        expect(val.steeptemperature).toBe(steeptemperature);
        expect(val.sessioninstance).toBe(sessioninstance);
        expect(val.fixins_list).toBe(fixins);
    });

    xit('check steeping vessel getter returns expected value', () => {
        // get steepingvessel() { return SteepingVessels[this.steepingvessel_idx]; }
    });

    xit('check fixins getter returns expected value', () => {
        // get fixins() {
    });

    it('check datetime getter returns expected value', () => {
        const dt = val.datetime;
        const hasDate = (dt.getMonth() + 1) + '/' + dt.getDate() + '/' + dt.getFullYear();
        let mins = String(dt.getMinutes());
        if (mins.length === 1) {
            mins = '0' + mins;
        }
        const hasTime = parseInt(String(dt.getHours()) + mins, 10);

        expect(hasDate).toBe(date);
        expect(hasTime).toBe(time);
    });
});
