import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';  // Needed because this will run in a browser
import { HttpModule }     from '@angular/http';

import { RoutingModule } from './routing.module';

import { HgTea }              from './hgtea.component'
import { HgTeaJournal }       from './hgtea-journal.component'
import { HgTeaJournalEntry }  from './hgtea-journal-entry.component'
import { HgTeaDatabase }       from './hgtea-database.component'
import { HgTeaDatabaseEntry }  from './hgtea-database-entry.component'

import { NaturalLanguageDatePipe } from './natural-language-date-pipe'

@NgModule({
  imports:      [ BrowserModule,
                  HttpModule,
                  RoutingModule,
  ],
  declarations: [ HgTea,
                  HgTeaJournal,
                  HgTeaJournalEntry,
                  HgTeaDatabase,
                  HgTeaDatabaseEntry,
                  NaturalLanguageDatePipe
  ],
  bootstrap:    [ HgTea ]
})

export class HgTeaModule { }
