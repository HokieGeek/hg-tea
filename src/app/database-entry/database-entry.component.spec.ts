import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DatabaseEntryComponent } from './database-entry.component';
import { PurchaseInfoComponent } from '../purchase-info/purchase-info.component';
import { RatingComponent } from '../rating/rating.component';
import { TeacupimgComponent } from '../teacupimg/teacupimg.component';
import { DatabaseEntryImagesComponent } from '../database-entry-images/database-entry-images.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { StatsComponent } from '../stats/stats.component';
import { JournalComponent } from '../journal/journal.component';
import { JournalEntryComponent } from '../journal-entry/journal-entry.component';
import { NaturalLanguageDatePipe } from '../natural-language-date-pipe';
import { SteeptimePipe } from '../steeptime.pipe';

import { Tea, TeaBuilder, Entry } from '../tea';
import { TestUtils } from '../test-utils';

describe('DatabaseEntryComponent', () => {
    let component: DatabaseEntryComponent;
    let fixture: ComponentFixture<DatabaseEntryComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NgbModule.forRoot(),
                FormsModule
            ],
            declarations: [
                RatingComponent,
                TeacupimgComponent,
                PurchaseInfoComponent,
                DatabaseEntryImagesComponent,
                DatabaseEntryComponent,
                BasicInfoComponent,
                StatsComponent,
                JournalComponent,
                JournalEntryComponent,
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
        fixture = TestBed.createComponent(DatabaseEntryComponent);
        component = fixture.componentInstance;

        const id = TestUtils.createRandomId();
        component.tea = TestUtils.createDummyTea(id);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('check only expected elements created', () => {
        // - Only one top-level element
        // - one card with one body and one footer
        //     the footer must be the entrydate
        // - in the card-body
        //    need an h4==card-title, h6==card-subtitle
        // - TODO: the rest
        it('card is only top-level element', () => {
            // > Check top element
            const elems = TestUtils.filterDebugNodes(fixture.debugElement.childNodes);
            for (const i in elems) {
                if (elems[i].name !== 'div' || elems[i].attributes['class'].indexOf('card') < 0) {
                    fail('Found an unexpected element');
                }
            }
            expect(elems.length).toBe(1);
        });

        it('children of card are only a card-body and a footer', () => {
            // > One card with one body and one footer
            const elems = TestUtils.filterDebugNodes(fixture.debugElement.query(By.css('.card')).childNodes);
            expect(elems.length).toBe(4);

            for (const i in elems) {
                if (elems[i].attributes['class'].indexOf('card-body') < 0
                    && elems[i].attributes['class'].indexOf('card-footer') < 0
                    && elems[i].attributes['class'].indexOf('card-header') < 0
                    && elems[i].attributes['class'].indexOf('card-img-top') < 0
                    && elems[i].attributes['class'].indexOf('tab-content') < 0) {
                    console.log('db-e: Found an unexpected element: ', elems);
                    fail('Found an unexpected element');
                }
            }
        });

        xit('name is set correctly', () => {
            expect(fixture.debugElement.query(By.css('h4')).nativeElement.innerText).toBe(component.tea.name);
        });

        xit('name title is set correctly', () => {
            const has = fixture.debugElement.query(By.css('h4')).properties['title'];
            const expected = component.tea.type + ' from ' + component.tea.country;
            expect(has).toBe(expected);
        });
    });

    xdescribe('missing data', () => {
        it('TODO', async(() => {
            component.tea = new TeaBuilder().from(component.tea).type(null).build();
            fixture.detectChanges();

            fixture.whenStable().then(result => {
                const has = fixture.debugElement.query(By.css('.card-footer'));
                expect(has).toBeNull();
            });
        }));
    });
});
