import { NaturalLanguageDatePipe } from './natural-language-date-pipe';

describe('Pipe: naturalDate', () => {
    let pipe: NaturalLanguageDatePipe;
    let has: Date;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    beforeEach(() => {
        pipe = new NaturalLanguageDatePipe();
        has = new Date();
    });

    describe('day_of_year', () => {
        it('simple', () => {
            const numDays = 20;
            has.setMonth(0);
            has.setDate(numDays);
            expect(pipe.day_of_year(has)).toBe(numDays);
        });
    });

    describe('time_transform', () => {
        it('midnight', () => {
            has.setHours(0);
            has.setMinutes((Math.random() * 49) + 10);
            expect(pipe.time_transform(has)).toBe('12:' + has.getMinutes() + 'a');
        });

        it('padded minutes', () => {
            has.setHours((Math.random() * 10) + 1);
            has.setMinutes(Math.random() * 9);
            expect(pipe.time_transform(has)).toBe(has.getHours() + ':0' + has.getMinutes() + 'a');
        });

        // TODO: more
    });

    describe('ordinal_indicator', () => {
        it('st', () => {
            expect(pipe.ordinal_indicator(1)).toBe('st');
            expect(pipe.ordinal_indicator(21)).toBe('st');
            expect(pipe.ordinal_indicator(101)).toBe('st');
        });

        it('nd', () => {
            expect(pipe.ordinal_indicator(2)).toBe('nd');
            expect(pipe.ordinal_indicator(22)).toBe('nd');
            expect(pipe.ordinal_indicator(102)).toBe('nd');
        });

        it('rd', () => {
            expect(pipe.ordinal_indicator(3)).toBe('rd');
            expect(pipe.ordinal_indicator(23)).toBe('rd');
            expect(pipe.ordinal_indicator(103)).toBe('rd');
        });

        it('th', () => {
            expect(pipe.ordinal_indicator(4)).toBe('th');
            expect(pipe.ordinal_indicator(24)).toBe('th');
            expect(pipe.ordinal_indicator(104)).toBe('th');
        });
    });

    describe('transform', () => {
        describe('dates within the last hour', () => {
            it('just now', () => {
                expect(pipe.transform(has)).toBe('Just now');
            });

            it('a few minutes ago', () => {
                has.setMinutes(has.getMinutes() - ((Math.random() * 13) + 1));
                console.log('[fmin] has: ', has);
                expect(pipe.transform(has)).toBe('A few minutes ago');
            });

            it('half an hour ago', () => {
                has.setMinutes(has.getMinutes() - ((Math.random() * 14) + 15));
                expect(pipe.transform(has)).toBe('Half an hour ago');
            });

            it('over half an hour ago', () => {
                has.setMinutes(has.getMinutes() - ((Math.random() * 24) + 31));
                expect(pipe.transform(has)).toBe('Over half an hour ago');
            });

            it('an hour ago', () => {
                has.setMinutes(has.getMinutes() - 59);
                expect(pipe.transform(has)).toBe('An hour ago');
            });
        });

        describe('dates on the same day', () => {
            it('a couple of hours ago', () => {
                has.setHours(has.getHours() - 1);
                has.setMinutes(has.getMinutes() - 55);
                console.log('[couple] has: ', has);
                expect(pipe.transform(has)).toBe('A couple of hours ago');
            });

            it('a few hours ago', () => {
                has.setTime(has.getTime() - (((Math.random() * 2) + 1) * 3600 * 1000));
                console.log('[fhours] has: ', has);
                expect(pipe.transform(has)).toBe('A few hours ago');
            });

            it('this morning', () => {
                const ahora = new Date(has.getTime());
                ahora.setHours(7); // Set to 1pm to ensure it happens in the afternoon of the same day
                has.setHours(1); // Set to 1am to ensure it is still within the 24 hour thingy
                expect(pipe.transform(has, ahora)).toBe('This morning');
            });

            it('this afternoon', () => {
                const ahora = new Date(has.getTime());
                ahora.setHours(20); // Set to 1pm to ensure it happens in the afternoon of the same day
                has.setHours(13); // Set to 1am to ensure it is still within the 24 hour thingy
                expect(pipe.transform(has, ahora)).toBe('This afternoon');
            });

            it('this evening', () => {
                const ahora = new Date(has.getTime());
                ahora.setHours(23); // Set to 1pm to ensure it happens in the afternoon of the same day
                has.setHours(17); // Set to 1am to ensure it is still within the 24 hour thingy
                expect(pipe.transform(has, ahora)).toBe('This evening');
            });

            it('this morning at X', () => {
                const ahora = new Date(has.getTime());
                has.setHours(1); // Set to 1am to ensure it happens in the morning
                ahora.setHours(has.getHours() + 11); // Set to 11 hours after the event to ensure it happens in the window
                expect(pipe.transform(has, ahora)).toBe('This morning at ' + has.getHours());
            });

            it('this afternoon at X', () => {
                const ahora = new Date(has.getTime());
                has.setHours(13); // Set to 1pm to ensure it happens in the afternoon
                ahora.setHours(has.getHours() + 10); // Set to 10 hours after the event to ensure it happens in the window
                expect(pipe.transform(has, ahora)).toBe('This afternoon at ' + (has.getHours() - 12));
            });

            it('around noon', () => {
                const ahora = new Date(has.getTime());
                ahora.setHours(23); // Set to 11pm to ensure it happens in the evening of the same day
                has.setHours(12); // Set to noon
                expect(pipe.transform(has, ahora)).toBe('Around noon');
            });

            it('over 12 hours ago', () => {
                const hr = (Math.random() * 10) + 1;
                const ahora = new Date(has.getTime());
                ahora.setHours(hr + 13); // Set now to be in the evening + 1 hour past
                has.setHours(hr); // Set event date to be in the morning
                expect(pipe.transform(has, ahora)).toBe(pipe.time_transform(has));
            });
        });

        describe('dates on the same week', () => {
            it('last night', () => {
                const ahora = new Date(has.getTime());
                ahora.setHours(1); // Set to 1am to ensure it is still within the 24 hour thingy
                has.setDate(has.getDate() - 1);
                has.setHours(18);
                expect(pipe.transform(has, ahora)).toBe('Last night at ' + pipe.time_transform(has));
            });

            it('yesterday', () => {
                const ahora = new Date(has.getTime());
                ahora.setHours(1); // Set to 1am to ensure it is still within the 24 hour thingy
                has.setDate(has.getDate() - 1);
                has.setHours(ahora.getHours() + 1); // Set to 1 hour after ahora to ensure it's occurring in the evening
                expect(pipe.transform(has, ahora)).toBe('Yesterday at ' + pipe.time_transform(has));
            });

            it('a few days ago', () => {
                has.setDate(has.getDate() - 2);
                expect(pipe.transform(has)).toBe(days[has.getDay()] + ' at ' + pipe.time_transform(has));
            });
        });

        describe('dates on the same month', () => {
            it('a few weeks ago', () => {
                has.setDate(has.getDate() - 8);
                const want = 'The ' + has.getDate() + pipe.ordinal_indicator(has.getDate()) + ' at ' + pipe.time_transform(has);
                expect(pipe.transform(has)).toBe(want);
            });
        });

        describe('dates over a month ago', () => {
            it('a month or more ago', () => {
                // has.setMonth(has.getMonth() - ((Math.random() * 10) + 1));
                has.setMonth(has.getMonth() - 2);
                const want = months[has.getMonth()] + ' ' + has.getDate() + ' at ' + pipe.time_transform(has);
                console.log('[>month] has: ', has);
                expect(pipe.transform(has)).toBe(want);
            });

            it('a year or more ago', () => {
                has.setFullYear(has.getFullYear() - ((Math.random() * 10) + 1));
                const want = months[has.getMonth()] + ' ' + has.getDate() + ', ' + has.getFullYear() + ' at ' + pipe.time_transform(has);
                expect(pipe.transform(has)).toBe(want);
            });
        });
    });
});
