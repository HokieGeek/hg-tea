import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { DatabaseComponent } from './database.component';
import { DatabaseEntryComponent } from '../database-entry/database-entry.component';
import { PurchaseInfoComponent } from '../purchase-info/purchase-info.component';
import { RatingComponent } from '../rating/rating.component';
import { TeacupimgComponent } from '../teacupimg/teacupimg.component';
import { BasicInfoComponent } from '../database-entry/basic-info/basic-info.component';
import { DatabaseEntryImagesComponent } from '../database-entry-images/database-entry-images.component';
import { JournalComponent } from '../journal/journal.component';
import { JournalEntryComponent } from '../journal-entry/journal-entry.component';
import { NaturalLanguageDatePipe } from '../natural-language-date-pipe';
import { SteeptimePipe } from '../steeptime.pipe';

import { HgTeaComponent } from '../hgtea.component';
import { TeasComponent } from '../teas/teas.component';
import { TeasSidebarComponent } from '../teas-sidebar/teas-sidebar.component';
import { FilterComponent } from '../teas-sidebar/filter/filter.component';
import { StringFieldComponent } from '../teas-sidebar/filter/string-field/string-field.component';
import { FlagFieldComponent } from '../teas-sidebar/filter/flag-field/flag-field.component';
import { SorterComponent } from '../teas-sidebar/sorter/sorter.component';
import { SortFieldComponent } from '../teas-sidebar/sorter/sort-field/sort-field.component';
import { ViewManagerComponent } from '../teas-sidebar/view-manager/view-manager.component';
import { PaginatorComponent } from '../paginator/paginator.component';
import { InputComponent } from '../input/input.component';
import { EnumValuesPipe } from '../enum-values.pipe';
import { SteepTimeComponent } from '../input/steep-time/steep-time.component';
import { UnratedComponent } from '../input/unrated/unrated.component';
import { TeaEditorComponent } from '../input/teaeditor/teaeditor.component';
import { DatetimeComponent } from '../input/datetime/datetime.component';
import { EntryEditComponent } from '../input/entry-edit/entry-edit.component';
import { TeaEditComponent } from '../input/tea-edit/tea-edit.component';
import { StatsComponent } from '../stats/stats.component';

import { Filter, Sorter } from '../view.service';

import { APP_BASE_HREF } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';

import { TestUtils } from '../test-utils';

describe('DatabaseComponent', () => {
    let component: DatabaseComponent;
    let fixture: ComponentFixture<DatabaseComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserModule,
                BrowserAnimationsModule,
                NgbModule.forRoot(),
                FormsModule,
                AppRoutingModule,
                OwlDateTimeModule,
                OwlNativeDateTimeModule,
            ],
            declarations: [
                RatingComponent,
                TeacupimgComponent,
                DatabaseComponent,
                DatabaseEntryComponent,
                PurchaseInfoComponent,
                BasicInfoComponent,
                StatsComponent,
                DatabaseEntryImagesComponent,
                JournalComponent,
                JournalEntryComponent,
                NaturalLanguageDatePipe,
                SteeptimePipe,

                HgTeaComponent,
                TeasComponent,
                TeasSidebarComponent,
                FilterComponent,
                StringFieldComponent,
                FlagFieldComponent,
                SorterComponent,
                SortFieldComponent,
                ViewManagerComponent,
                PaginatorComponent,
                InputComponent,
                EnumValuesPipe,
                SteepTimeComponent,
                PaginatorComponent,
                UnratedComponent,
                TeaEditorComponent,
                DatetimeComponent,
                EntryEditComponent,
                TeaEditComponent,
            ],
            providers: [
                NaturalLanguageDatePipe,
                SteeptimePipe,
                {provide: APP_BASE_HREF, useValue : '/' }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DatabaseComponent);
        component = fixture.componentInstance;

        component.teas = TestUtils.createDummyTeasWithEntries();

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    xit('correct number of entries are created', () => {
        let has = 0;
        const nodes = fixture.debugElement.query(By.css('.card-deck')).nativeElement.childNodes;
        for (let i = nodes.length - 1; i >= 0; i--) {
            if (nodes[i].nodeName === 'HG-DATABASE-ENTRY') {
                has++;
            }
        }
        expect(has).toBe(component.teas.length);
    });

    xit('verify all expected entries are listed', () => {
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

    xit('check that there are only two top-level element', () => {
        const children = fixture.debugElement.nativeElement.children;

        expect(children.length).toBe(2);
        // expect(children[0].nodeName).toBe('DIV');
        // expect(children[0].className).toBe('card-deck');
        expect(children[1].nodeName).toBe('DIV');
        expect(children[1].className).toBe('card-deck');
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
