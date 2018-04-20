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

    const numRatingImages = 4;

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

        component.entry = new Entry(
            1, // teaId
            'COMMENT', // comments
            '12/30/2011 7:49:05', // timestamp
            '9999/99/99', // date
            900, // time
            3, // rating
            '', // pictures
            '1m 2s', // steeptime
            0, // steepingvessel_idx
            212, // steeptemperature
            '', // sessioninstance
            '' // fixins_list
        )

        component.tea = new Tea(
            1, // id
            'Foobar', // name
            '12/30/2011 7:49:05', // timestamp
            '9999/99/99', // date
            'Sheng', // type
            'Yunnan', // region
            2999, // year
            0, // flush
            'tea.awesome.site', // purchaselocation
            '9999/99/99', // purchasedate
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
        )

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

    it('fixins not set', () => {
        let has = fixture.debugElement.query(By.css('h6'));
        expect(has).toBeNull();
        // TODO: do its counterpart
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
        let expected = component.entry.rating + ' out of ' + numRatingImages;
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
        expect(has).toBe(numRatingImages);
    });

    it('rating has images correctly displayed', () => {
        let hasSelected = 0;
        let hasUnselected = 0;
        fixture.debugElement.query(By.css('#rating')).nativeElement.childNodes.forEach(
            function(val, idx, obj) {
                if (val.nodeName === 'TEACUPIMG') {
                    if (val.attributes.getNamedItem('ng-reflect-unselect').value === 'false') {
                        hasSelected++;
                    } else {
                        hasUnselected++;
                    }
                }
            });

        expect(hasSelected).toBe(component.entry.rating);
        expect(hasUnselected).toBe(numRatingImages - component.entry.rating);
    });

    /* TODO of currently displayed
     * entrydate
     */
});
