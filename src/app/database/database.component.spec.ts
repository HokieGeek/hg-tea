import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { DatabaseComponent } from './database.component';
import { DatabaseEntryComponent } from '../database-entry/database-entry.component';
import { PurchaseInfoComponent } from '../purchase-info/purchase-info.component';
import { RatingComponent } from '../rating/rating.component';
import { TeacupimgComponent } from '../teacupimg/teacupimg.component';

import { TestUtils } from '../test-utils';

describe('DatabaseComponent', () => {
    let component: DatabaseComponent;
    let fixture: ComponentFixture<DatabaseComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule ],
            declarations: [
                RatingComponent,
                TeacupimgComponent,
                DatabaseComponent,
                DatabaseEntryComponent,
                PurchaseInfoComponent
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DatabaseComponent);
        component = fixture.componentInstance;

        const dummyData = TestUtils.createDummyTea();
        component.teas = [dummyData];

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('correct number of entries are created', () => {
        let has = 0;
        const nodes = fixture.debugElement.query(By.css('.card-deck')).nativeElement.childNodes;
        for (let i = nodes.length - 1; i >= 0; i--) {
            if (nodes[i].nodeName === 'HG-DATABASE-ENTRY') {
                has++;
            }
        }
        expect(has).toBe(component.teas.length);
    });

    it('verify all expected entries are listed', () => {
        // need some way to verify an individual database-entry as belonging to the list of entries...
        const entries = fixture.debugElement.queryAll(By.css('hg-database-entry'));
        expect(entries.length).toBe(component.teas.length);

        // Build the list of entrydates (count dupes)
        const expectedTeas: Map<number, number> = new Map();
        for (const t of component.teas) {
            if (expectedTeas.has(t.id)) {
                expectedTeas.set(t.id, expectedTeas.get(t.id) + 1);
            } else {
                expectedTeas.set(t.id, 1);
            }
        }

        // Now check the returned elements to see if they have the same dates
        const has: Map<number, number> = new Map();
        for (let i = entries.length - 1; i >= 0; i--) {
            const id = parseInt(entries[i].query(By.css('input')).properties['value'], 10);
            expect(expectedTeas.has(id)).toBeTruthy();

            if (has.has(id)) {
                has.set(id, has.get(id) + 1);
            } else {
                has.set(id, 1);
            }
        }
        expect(has.size).toBe(expectedTeas.size);
    });

    it('check that there is only one top-level element', () => {
        const children = fixture.debugElement.nativeElement.children;

        expect(children.length).toBe(1);
        expect(children[0].nodeName).toBe('DIV');
        expect(children[0].className).toBe('card-deck');
    });

    it('check that only hg-database-entry elements are in the top component', () => {
        /*
         * Expected schema
         * <div class="card-deck">
         *  <hg-database-entry></hg-database-entry>
         *  <hg-database-entry></hg-database-entry>
         *  ....
         *  <hg-database-entry></hg-database-entry>
         * </div>
         */
        let notEntries = 0;
        const nodes = fixture.debugElement.query(By.css('.card-deck')).nativeElement.childNodes;

        for (let i = nodes.length - 1; i >= 0; i--) {
            if (nodes[i].nodeName !== 'HG-DATABASE-ENTRY'
                && nodes[i].nodeName !== '#comment'
                && nodes[i].nodeName !== '#text') {

                notEntries++;
            }
        }
        expect(notEntries).toBe(0);
    });
});
