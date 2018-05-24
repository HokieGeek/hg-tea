import { Entry, SteepingVessels, TeaFixins } from './entry';

describe('entry', () => {
    const numRatingValues = 4;
    const maxNumFixins = 11;
    const maxNumSteepingVessels = 10;

    const now = new Date();
    const teaid = 0;
    const date = (now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear();
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
    const timestamp = '12/30/2011 7:49:05';
    const rating = Math.floor(Math.random() * numRatingValues) + 1;
    const pictures = '';
    const steeptime = '1m 2s';
    const steepingvessel = Math.floor(Math.random() * maxNumSteepingVessels);
    const steeptemperature = 212;
    const sessioninstance = '';

    console.log('dummy date = ', date);
    console.log('dummy time = ', time);

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
