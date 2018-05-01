import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HgTeaComponent } from './hgtea.component';
import { JournalComponent } from './journal/journal.component';
import { JournalEntryComponent } from './journal/journal-entry.component';
import { DatabaseComponent } from './database/database.component';
import { DatabaseEntryComponent } from './database/database-entry.component';
import { TeacupimgComponent } from './teacupimg/teacupimg.component';

import { NaturalLanguageDatePipe } from './natural-language-date-pipe';
import { RatingComponent } from './rating/rating.component';

@NgModule({
    declarations: [
        HgTeaComponent,
        JournalComponent,
        JournalEntryComponent,
        DatabaseComponent,
        DatabaseEntryComponent,
        TeacupimgComponent,
        NaturalLanguageDatePipe,
        RatingComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule, // TODO: HttpModule is deprecated
    ],
    providers: [],
    bootstrap: [HgTeaComponent]
})
export class HgTeaModule { }
