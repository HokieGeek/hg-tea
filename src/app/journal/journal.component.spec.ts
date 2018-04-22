import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { JournalComponent } from './journal.component';
import { JournalEntryComponent } from './journal-entry.component';
import { TeacupimgComponent } from '../teacupimg/teacupimg.component';
import { NaturalLanguageDatePipe } from '../natural-language-date-pipe'

import { Tea } from '../tea'
import { Entry } from '../entry'

describe('JournalComponent', () => {
    let component: JournalComponent;
    let fixture: ComponentFixture<JournalComponent>;

    const numRatingValues = 4;
    const maxNumFixins = 11;
    const maxNumSteepingVessels = 9;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule ],
            declarations: [
                JournalComponent,
                JournalEntryComponent,
                TeacupimgComponent,
                NaturalLanguageDatePipe
            ],
            providers: [ NaturalLanguageDatePipe ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JournalComponent);
        component = fixture.componentInstance;

        let id = 0;

        let now = new Date();
        let today = (now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear();
        let time = parseInt(now.getHours() + '' + now.getMinutes(), 10);

        let fixins: string;
        for (let i = Math.floor(Math.random() * 2); i >= 0; i--) {
            fixins += Math.floor(Math.random() * maxNumFixins);
            fixins += ';';
        }
        fixins = fixins.slice(0, -1);

        component.entries = [new Entry(
            id, // teaId (HAS TO MATCH ARRAY POS)
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
        )];

        component.teas = [new Tea(
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
        )];

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('correct number of entries are created', () => {
        let has = 0;
        let nodes = fixture.debugElement.query(By.css('.card-columns')).nativeElement.childNodes;
        for (let i = nodes.length - 1; i >= 0; i--) {
            if (nodes[i].nodeName === 'JOURNAL-ENTRY') {
                has++;
            }
        }
        expect(has).toBe(component.entries.length);
    });

    xit('verify all expected entries are listed', () => {
        // TODO
    });

    it('check that there is only one top-level element', () => {
        let children = fixture.debugElement.nativeElement.children

        expect(children.length).toBe(1);
        expect(children[0].nodeName).toBe('DIV');
        expect(children[0].className).toBe('card-columns');
    });

    it('check that only journal-entry elements are in the top component', () => {
        /*
         * Expected schema
         * <div class="card-columns">
         *  <journal-entry></journal-entry>
         *  <journal-entry></journal-entry>
         *  ....
         *  <journal-entry></journal-entry>
         * </div>
         */
        let notEntries = 0;
        let nodes = fixture.debugElement.query(By.css('.card-columns')).nativeElement.childNodes;

        for (let i = nodes.length - 1; i >= 0; i--) {
            if (nodes[i].nodeName !== 'JOURNAL-ENTRY'
                && nodes[i].nodeName !== '#comment'
                && nodes[i].nodeName !== '#text') {

                notEntries++;
            }
        }
        expect(notEntries).toBe(0);
    });
});
