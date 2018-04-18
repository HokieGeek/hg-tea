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

@NgModule({
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
    ],
    providers: [],
    bootstrap: [HgTeaComponent]
})
export class HgTeaModule { }
