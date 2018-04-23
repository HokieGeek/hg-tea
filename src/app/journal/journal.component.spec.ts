import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { JournalComponent } from './journal.component';
import { JournalEntryComponent } from './journal-entry.component';
import { TeacupimgComponent } from '../teacupimg/teacupimg.component';
import { NaturalLanguageDatePipe } from '../natural-language-date-pipe'

import { TestUtils } from '../test-utils'

describe('JournalComponent', () => {
    let component: JournalComponent;
    let fixture: ComponentFixture<JournalComponent>;

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

        let dummyData = TestUtils.createDummyTeasWithEntries();
        component.teas = dummyData.teas;
        component.entries = dummyData.entries;

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

    it('verify all expected entries are listed', () => {
        // need some way to verify an individual journal-entry as belonging to the list of entries...
        let entries = fixture.debugElement.queryAll(By.css('journal-entry'));
        expect(entries.length).toBe(component.entries.length);

        // Build the list of entrydates (count dupes)
        let expectedDates: Map<number, number> = new Map();
        for (let e of component.entries) {
            let d: number = e.datetime.getTime();
            if (expectedDates.has(d)) {
                expectedDates.set(d, expectedDates.get(d) + 1);
            } else {
                expectedDates.set(d, 1);
            }
        }

        // Now check the returned elements to see if they have the same dates
        // let has: Map<Date, number> = new Map();
        let has: Map<number, number> = new Map();
        for (let i = entries.length - 1; i >= 0; i--) {
            // let d = new Date(entries[i].query(By.css('#entrydate')).properties['title']);
            let d = (new Date(entries[i].query(By.css('#entrydate')).properties['title'])).getTime();
            expect(expectedDates.has(d)).toBeTruthy();

            if (has.has(d)) {
                has.set(d, has.get(d) + 1);
            } else {
                has.set(d, 1);
            }
        }
        expect(has.size).toBe(expectedDates.size);
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
