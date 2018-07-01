import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { AppRoutingModule } from './app-routing.module';

import { HgTeaComponent } from './hgtea.component';
import { TeacupimgComponent } from './teacupimg/teacupimg.component';
import { RatingComponent } from './rating/rating.component';
import { JournalComponent } from './journal/journal.component';
import { JournalEntryComponent } from './journal-entry/journal-entry.component';
import { DatabaseComponent } from './database/database.component';
import { DatabaseEntryComponent } from './database-entry/database-entry.component';
import { DatabaseEntryImagesComponent } from './database-entry-images/database-entry-images.component';
import { BasicInfoComponent } from './database-entry/basic-info/basic-info.component';

import { PurchaseInfoComponent } from './purchase-info/purchase-info.component';
import { TeasComponent } from './teas/teas.component';
import { TeasSidebarComponent } from './teas-sidebar/teas-sidebar.component';
import { FilterComponent } from './teas-sidebar/filter/filter.component';
import { StringFieldComponent } from './teas-sidebar/filter/string-field/string-field.component';
import { FlagFieldComponent } from './teas-sidebar/filter/flag-field/flag-field.component';
import { SorterComponent } from './teas-sidebar/sorter/sorter.component';
import { SortFieldComponent } from './teas-sidebar/sorter/sort-field/sort-field.component';
import { ViewManagerComponent } from './teas-sidebar/view-manager/view-manager.component';
import { PaginatorComponent } from './paginator/paginator.component';

import { InputComponent } from './input/input.component';
import { SteepTimeComponent } from './input/steep-time/steep-time.component';

import { NaturalLanguageDatePipe } from './natural-language-date-pipe';
import { EnumValuesPipe } from './enum-values.pipe';
import { UnratedComponent } from './input/unrated/unrated.component';
import { TeaEditorComponent } from './input/teaeditor/teaeditor.component';
import { SteeptimePipe } from './steeptime.pipe';
import { DatetimeComponent } from './input/datetime/datetime.component';
import { EntryEditComponent } from './input/entry-edit/entry-edit.component';
import { TeaEditComponent } from './input/tea-edit/tea-edit.component';

import { StatsComponent } from './stats/stats.component';

@NgModule({
    imports: [
        NgbModule.forRoot(),
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
    ],
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
        BasicInfoComponent,
        StatsComponent,
        DatabaseEntryImagesComponent,
        TeasComponent,
        TeasSidebarComponent,
        FilterComponent,
        StringFieldComponent,
        FlagFieldComponent,
        SorterComponent,
        SortFieldComponent,
        ViewManagerComponent,
        PaginatorComponent,
        InputComponent,
        EnumValuesPipe,
        SteepTimeComponent,
        UnratedComponent,
        TeaEditorComponent,
        SteeptimePipe,
        DatetimeComponent,
        EntryEditComponent,
        TeaEditComponent,
    ],
    providers: [HttpClient],
    bootstrap: [HgTeaComponent]
})
export class HgTeaModule { }
