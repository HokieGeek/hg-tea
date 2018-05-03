import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { HgTeaComponent } from './hgtea.component';
import { JournalComponent } from './journal/journal.component';
import { JournalEntryComponent } from './journal-entry/journal-entry.component';
import { DatabaseComponent } from './database/database.component';
import { DatabaseEntryComponent } from './database-entry/database-entry.component';
import { TeacupimgComponent } from './teacupimg/teacupimg.component';
import { RatingComponent } from './rating/rating.component';

import { NaturalLanguageDatePipe } from './natural-language-date-pipe';
import { PurchaseInfoComponent } from './purchase-info/purchase-info.component';

@NgModule({
    declarations: [
        HgTeaComponent,
        JournalComponent,
        JournalEntryComponent,
        DatabaseComponent,
        DatabaseEntryComponent,
        TeacupimgComponent,
        RatingComponent,
        NaturalLanguageDatePipe,
        PurchaseInfoComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
    ],
    providers: [HttpClient],
    bootstrap: [HgTeaComponent]
})
export class HgTeaModule { }
