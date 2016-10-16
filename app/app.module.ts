import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';  // Needed because this will run in a browser
import { HttpModule }  from '@angular/http';

import { HgTea }   from './app.hgtea'
import { HgTeaJournal }   from './app.hgtea-journal'
import { HgTeaJournalEntry }   from './app.hgtea-journal-entry'

@NgModule({
  imports:      [ BrowserModule,
                  HttpModule
  ],
  declarations: [ HgTea,
                  HgTeaJournal,
                  HgTeaJournalEntry
  ],
  bootstrap:    [ HgTea ]
})

export class AppModule { }
