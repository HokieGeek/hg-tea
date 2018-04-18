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
import { TeacupimgComponent } from './journal/teacupimg/teacupimg.component'

describe('HgTeaComponent', () => {
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

  // it(`should have as title 'app works!'`, async(() => {
  //   let fixture = TestBed.createComponent(HgTea);
  //   let app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app works!');
  // }));

  // it('should render title in a h1 tag', async(() => {
  //   let fixture = TestBed.createComponent(HgTea);
  //   fixture.detectChanges();
  //   let compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('app works!');
  // }));
});
