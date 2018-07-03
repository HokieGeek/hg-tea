import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { JournalComponent } from './journal.component';
import { JournalEntryComponent } from '../journal-entry/journal-entry.component';
import { RatingComponent } from '../rating/rating.component';
import { TeacupimgComponent } from '../teacupimg/teacupimg.component';
import { NaturalLanguageDatePipe } from '../natural-language-date-pipe';
import { SteeptimePipe } from '../steeptime.pipe';

import { TestUtils } from '../test-utils';

describe('JournalComponent', () => {
    let component: JournalComponent;
    let fixture: ComponentFixture<JournalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NgbModule.forRoot(),
                FormsModule
            ],
            declarations: [
                JournalComponent,
                JournalEntryComponent,
                RatingComponent,
                TeacupimgComponent,
                NaturalLanguageDatePipe,
                SteeptimePipe,
            ],
            providers: [
                NaturalLanguageDatePipe,
                SteeptimePipe
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JournalComponent);
        component = fixture.componentInstance;

        // TODO: make better
        component.entries = [TestUtils.createDummyEntry()];

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('correct number of entries are created', async(() => {
        // need some way to verify an individual journal-entry as belonging to the list of entries...
        const entries = fixture.debugElement.queryAll(By.css('hg-journal-entry'));
        console.log(entries);
        expect(entries.length).toBe(1);

        // TODO
        // component.allEntries();
        // fixture.detectChanges();
        // fixture.whenStable().then(result => {
        //     console.log('result', result);
        //     entries = fixture.debugElement.queryAll(By.css('hg-journal-entry'));
        //     console.log('2', entries);
        //     expect(entries.length).toBe(this.sortedEntries.length);
        // });
    }));

    xit('verify all expected entries are listed', async(() => {
        component.allEntries();
        fixture.detectChanges();
        fixture.whenStable().then(result => {
            // need some way to verify an individual journal-entry as belonging to the list of entries...
            const entries = fixture.debugElement.queryAll(By.css('hg-journal-entry'));
            console.log(fixture.debugElement);

            // Build the list of entrydates (count dupes)
            const expectedDates: Map<number, number> = new Map();
            for (const e of component.entries) {
                const d: number = e.datetime.getTime();
                if (expectedDates.has(d)) {
                    expectedDates.set(d, expectedDates.get(d) + 1);
                } else {
                    expectedDates.set(d, 1);
                }
            }

            // Now check the returned elements to see if they have the same dates
            // let has: Map<Date, number> = new Map();
            const has: Map<number, number> = new Map();
            for (let i = entries.length - 1; i >= 0; i--) {
                // let d = new Date(entries[i].query(By.css('#entrydate')).properties['title']);
                const d = (new Date(entries[i].query(By.css('#entrydate')).properties['title'])).getTime();
                expect(expectedDates.has(d)).toBeTruthy();

                if (has.has(d)) {
                    has.set(d, has.get(d) + 1);
                } else {
                    has.set(d, 1);
                }
            }
            expect(has.size).toBe(expectedDates.size);
        });
    }));

    it('check that there is only one top-level element', () => {
        let notExpected = 0;
        // const nodes = TestUtils.filterTextAndCommentNodes(fixture.debugElement.nativeElement.childNodes);
        const nodes = fixture.debugElement.nativeElement.childNodes;
        for (let i = nodes.length - 1; i >= 0; i--) {
            if (nodes[i].nodeName !== 'HG-JOURNAL-ENTRY' && nodes[i].nodeName !== 'SPAN'
                && nodes[i].nodeName !== '#comment' && nodes[i].nodeName !== '#text') {
                notExpected++;
                console.log('Found an unexpected element', nodes[i]);
            }
        }
        expect(notExpected).toBe(0);
    });

    xit('check that only journal-entry elements are in the top component', () => {
        /*
         * Expected schema
         * <div class="card-deck">
         *  <hg-journal-entry></hg-journal-entry>
         *  <hg-journal-entry></hg-journal-entry>
         *  ....
         *  <hg-journal-entry></hg-journal-entry>
         * </div>
         */
        let notEntries = 0;
        const nodes = fixture.debugElement.query(By.css('.card-deck')).nativeElement.childNodes;

        for (let i = nodes.length - 1; i >= 0; i--) {
            if (nodes[i].nodeName !== 'HG-JOURNAL-ENTRY'
                && nodes[i].nodeName !== '#comment'
                && nodes[i].nodeName !== '#text') {

                notEntries++;
            }
        }
        expect(notEntries).toBe(0);
    });

    xit('getReversedEntries', () => {
        // TODO
        // expect(component).toBeTruthy();
    });
});
