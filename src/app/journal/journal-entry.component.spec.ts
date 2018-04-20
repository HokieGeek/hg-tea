import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { JournalEntryComponent } from './journal-entry.component';
import { TeacupimgComponent } from '../teacupimg/teacupimg.component';
import { NaturalLanguageDatePipe } from '../natural-language-date-pipe'

import { Tea } from '../tea'
import { Entry } from '../entry'

describe('JournalEntryComponent', () => {
    let component: JournalEntryComponent;
    let fixture: ComponentFixture<JournalEntryComponent>;

    const numRatingValues = 4;
    const maxNumFixins = 11;
    const maxNumSteepingVessels = 9;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule ],
            declarations: [
                NaturalLanguageDatePipe,
                TeacupimgComponent,
                JournalEntryComponent
            ],
            providers: [ NaturalLanguageDatePipe ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JournalEntryComponent);
        component = fixture.componentInstance;

        let id = Math.floor(Math.random()) + 1;

        let now = new Date();
        let today = (now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear();
        let time = parseInt(now.getHours() + '' + now.getMinutes(), 10);

        let fixins: string;
        for (let i = Math.floor(Math.random() * 2); i >= 0; i--) {
            fixins += Math.floor(Math.random() * maxNumFixins);
            fixins += ';';
        }
        fixins = fixins.slice(0, -1);

        component.entry = new Entry(
            id, // teaId
            'COMMENT', // comments
            '12/30/2011 7:49:05', // timestamp
            today, // date
            time, // time
            Math.floor(Math.random() * numRatingValues) + 1, // rating
            '', // pictures
            '1m 2s', // steeptime
            Math.floor(Math.random() * maxNumSteepingVessels), // steepingvessel_idx
            212, // steeptemperature
            '', // sessioninstance
            fixins // fixins_list
        );

        component.tea = new Tea(
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

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('name is set correctly', () => {
        expect(fixture.debugElement.query(By.css('h4')).nativeElement.innerText).toBe(component.tea.name);
    });

    it('name title is set correctly', () => {
        let has = fixture.debugElement.query(By.css('h4')).properties['title'];
        let expected = component.tea.type + ' from ' + component.tea.country;
        expect(has).toBe(expected);
    });

    it('fixins list makes sense', () => {
        let has = fixture.debugElement.query(By.css('h6')).nativeElement.innerHTML;
        let expected = document.createElement('h6').innerHTML = 'with&nbsp;' + component.entry.fixins.toLowerCase();
        expect(has).toBe(expected);
    });

    it('steeptime is correct', () => {
        let has = fixture.debugElement.query(By.css('#steeptime')).nativeElement.innerText;
        expect(has).toBe(component.entry.steeptime);
    });

    it('steeping vessel is correct', () => {
        let has = fixture.debugElement.query(By.css('#vessel')).nativeElement.innerText;
        expect(has).toBe('in a ' + component.entry.steepingvessel.toLowerCase());
    });

    it('temperature is correct', () => {
        let has = fixture.debugElement.query(By.css('#temperature')).nativeElement.innerText;
        expect(has).toBe('at ' + component.entry.steeptemperature + ' °F');
    });

    it('comments field is correct', () => {
        let has = fixture.debugElement.query(By.css('#comments')).nativeElement.childNodes.item(2).nodeValue;
        expect(has).toBe(component.entry.comments);
    });

    it('rating title is correct', () => {
        let has = fixture.debugElement.query(By.css('#rating')).properties['title'];
        let expected = component.entry.rating + ' out of ' + numRatingValues;
        expect(has).toBe(expected);
    });

    it('rating has the correct number of images', () => {
        let has = 0;
        fixture.debugElement.query(By.css('#rating')).nativeElement.childNodes.forEach(
            function(val, idx, obj) {
                if (val.nodeName === 'TEACUPIMG') {
                    has++;
                }
            });
        expect(has).toBe(numRatingValues);
    });

    it('rating has images correctly displayed', () => {
        let hasSelected = 0;
        let hasUnselected = 0;
        fixture.debugElement.query(By.css('#rating')).nativeElement.childNodes.forEach(
            function(val, idx, obj) {
                if (val.nodeName === 'TEACUPIMG') {
                    if (val.attributes.getNamedItem('ng-reflect-selected').value === 'true') {
                        hasSelected++;
                    } else {
                        hasUnselected++;
                    }
                }
            });

        expect(hasSelected).toBe(component.entry.rating);
        expect(hasUnselected).toBe(numRatingValues - component.entry.rating);
    });

    it('entrydate title is correct', () => {
        let has = fixture.debugElement.query(By.css('#entrydate')).properties['title'];
        expect(+(new Date(has)) === +component.entry.datetime).toBeTruthy();
    });

    it('entrydate is being displayed naturally', () => {
        let has = fixture.debugElement.query(By.css('#entrydate')).nativeElement.innerText;
        let pipe = new NaturalLanguageDatePipe()
        expect(has).toBe(pipe.transform(component.entry.datetime));
    });

    it('no fixins handled correctly', async(() => {
        component.entry.fixins_list = '';
        fixture.detectChanges();

        fixture.whenStable().then(result => {
            let has = fixture.debugElement.query(By.css('h6'));
            expect(has).toBeNull();
        });
    }));

    it('no steeptime is handled correctly', async(() => {
        component.entry.steeptime = '';
        fixture.detectChanges();

        fixture.whenStable().then(result => {
            let has = fixture.debugElement.query(By.css('#steeptime'));
            expect(has).toBeNull();
        });
    }));

    it('no steeping vessel is handled correctly', async(() => {
        component.entry.steepingvessel_idx = null;
        fixture.detectChanges();

        fixture.whenStable().then(result => {
            let has = fixture.debugElement.query(By.css('#vessel'));
            expect(has).toBeNull();
        });
    }));

    it('no temperature is handled correctly', async(() => {
        component.entry.steeptemperature = null;
        fixture.detectChanges();

        fixture.whenStable().then(result => {
            let has = fixture.debugElement.query(By.css('#temperature'));
            expect(has).toBeNull();
        });
    }));

    it('empty comments field is handled correctly', async(() => {
        component.entry.comments = '';
        fixture.detectChanges();

        fixture.whenStable().then(result => {
            let has = fixture.debugElement.query(By.css('#comments'));
            expect(has).toBeNull();
        });
    }));
});
