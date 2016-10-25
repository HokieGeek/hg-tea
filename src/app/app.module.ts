import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RoutingModule } from './routing.module';

import { HgTea } from './hgtea.component';
import { HgTeaJournal } from './journal/hgtea-journal.component';
import { HgTeaJournalEntry }  from './journal/hgtea-journal-entry.component'
import { HgTeaDatabase }  from './database/hgtea-database.component'
import { HgTeaDatabaseEntry }  from './database/hgtea-database-entry.component'

import { NaturalLanguageDatePipe } from './natural-language-date-pipe'

@NgModule({
    declarations: [
        HgTea,
        HgTeaJournal,
        HgTeaJournalEntry,
        HgTeaDatabase,
        HgTeaDatabaseEntry,
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
