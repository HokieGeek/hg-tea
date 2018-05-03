/* tslint:disable:no-unused-variable */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { HgTeaComponent } from './hgtea.component';
import { JournalComponent } from './journal/journal.component';
import { JournalEntryComponent } from './journal/entry/journal-entry.component';
import { DatabaseComponent } from './database/database.component';
import { DatabaseEntryComponent } from './database/entry/database-entry.component';
import { PurchaseInfoComponent } from './purchase-info/purchase-info.component';

import { RatingComponent } from './rating/rating.component';
import { TeacupimgComponent } from './teacupimg/teacupimg.component';
import { NaturalLanguageDatePipe } from './natural-language-date-pipe';

import { TestUtils } from './test-utils';

describe('HgTeaComponent', () => {
    let fixture: ComponentFixture<HgTeaComponent>;
    let component: HgTeaComponent;

    const numPrimaryElements = 2;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                HgTeaComponent,
                JournalComponent,
                JournalEntryComponent,
                DatabaseComponent,
                DatabaseEntryComponent,
                PurchaseInfoComponent,
                NaturalLanguageDatePipe,
                RatingComponent,
                TeacupimgComponent,
            ],
            imports: [
                BrowserModule,
                FormsModule,
                HttpClientModule,
            ],
            providers: [HttpClient]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HgTeaComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create the app', async(() => {
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it(`should create a journal element`, async(() => {
        let has = 0;
        const nodes = fixture.debugElement.query(By.css('.tab-content')).nativeElement.childNodes;
        for (let i = nodes.length - 1; i >= 0; i--) {
            if (nodes[i].nodeName === 'HG-JOURNAL') {
                has++;
            }
        }
        expect(has).toBe(1);
    }));

    it('should create a database element', async(() => {
        let has = 0;
        const nodes = fixture.debugElement.query(By.css('.tab-content')).nativeElement.childNodes;
        for (let i = nodes.length - 1; i >= 0; i--) {
            if (nodes[i].nodeName === 'HG-DATABASE') {
                has++;
            }
        }
        expect(has).toBe(1);
    }));

    it('should not have more than the required elements', async(() => {
        const nodes = TestUtils.filterTextAndCommentNodes(fixture.debugElement.query(By.css('.tab-content')).childNodes);
        expect(nodes.length).toBe(numPrimaryElements);
    }));
});
