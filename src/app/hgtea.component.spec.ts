/* tslint:disable:no-unused-variable */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RoutingModule } from './routing.module';

import { HgTeaComponent } from './hgtea.component';
import { JournalComponent } from './journal/journal.component';
import { JournalEntryComponent } from './journal/journal-entry.component';
import { DatabaseComponent } from './database/database.component';
import { DatabaseEntryComponent } from './database/database-entry.component';

import { NaturalLanguageDatePipe } from './natural-language-date-pipe';
import { TeacupimgComponent } from './teacupimg/teacupimg.component';

describe('HgTeaComponent', () => {
    let fixture: ComponentFixture<HgTeaComponent>;

    const numPrimaryElements = 2;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                HgTeaComponent,
                JournalComponent,
                JournalEntryComponent,
                DatabaseComponent,
                DatabaseEntryComponent,
                NaturalLanguageDatePipe,
                TeacupimgComponent,
            ],
            imports: [
                BrowserModule,
                FormsModule,
                HttpModule, // TODO: deprecated
                RoutingModule,
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HgTeaComponent);
        // component = fixture.componentInstance;

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
            if (nodes[i].nodeName === 'JOURNAL') {
                has++;
            }
        }
        expect(has).toBe(1);
    }));

    it('should create a database element', async(() => {
        let has = 0;
        const nodes = fixture.debugElement.query(By.css('.tab-content')).nativeElement.childNodes;
        for (let i = nodes.length - 1; i >= 0; i--) {
            if (nodes[i].nodeName === 'DATABASE') {
                has++;
            }
        }
        expect(has).toBe(1);
    }));

    it('should not have more than the required elements', async(() => {
        let has = 0;
        const nodes = fixture.debugElement.query(By.css('.tab-content')).nativeElement.childNodes;

        for (let i = nodes.length - 1; i >= 0; i--) {
            if (nodes[i].nodeName !== '#comment' && nodes[i].nodeName !== '#text') {

                has++;
            }
        }
        expect(has).toBe(numPrimaryElements);
    }));
});
