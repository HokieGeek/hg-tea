/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RoutingModule } from './routing.module';

import { HgTeaComponent } from './hgtea.component';
import { JournalComponent } from './journal/journal.component';
import { JournalEntryComponent }  from './journal/journal-entry.component'
import { DatabaseComponent }  from './database/database.component'
import { DatabaseEntryComponent }  from './database/database-entry.component'

import { NaturalLanguageDatePipe } from './natural-language-date-pipe';
import { TeacupimgComponent } from './teacupimg/teacupimg.component'

describe('HgTeaComponent', () => {
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
                HttpModule,
                RoutingModule,
            ]
        }).compileComponents();
    });

    it('should create the app', async(() => {
        let fixture = TestBed.createComponent(HgTeaComponent);
        let app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    xit(`should create a journal element`, async(() => {
    }));

    xit('should create a database element', async(() => {
    }));

    xit('should not have more than the required elements', async(() => {
    }));
});
