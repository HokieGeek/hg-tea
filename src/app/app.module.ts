import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RoutingModule } from './routing.module';

import { HgTeaComponent } from './hgtea.component';
import { HgTeaJournalComponent } from './journal/hgtea-journal.component';
import { HgTeaJournalEntryComponent }  from './journal/hgtea-journal-entry.component'
import { HgTeaDatabaseComponent }  from './database/hgtea-database.component'
import { HgTeaDatabaseEntryComponent }  from './database/hgtea-database-entry.component'

import { NaturalLanguageDatePipe } from './natural-language-date-pipe'

@NgModule({
    declarations: [
        HgTeaComponent,
        HgTeaJournalComponent,
        HgTeaJournalEntryComponent,
        HgTeaDatabaseComponent,
        HgTeaDatabaseEntryComponent,
        NaturalLanguageDatePipe,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RoutingModule,
    ],
    providers: [],
    bootstrap: [HgTea]
})
export class HgTeaModule { }
