import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TeasComponent } from './teas.component';

import { HgTeaComponent } from '../hgtea.component';
import { TeasSidebarComponent } from '../teas-sidebar/teas-sidebar.component';
import { FilterComponent } from '../teas-sidebar/filter/filter.component';
import { StringFieldComponent } from '../teas-sidebar/filter/string-field/string-field.component';
import { FlagFieldComponent } from '../teas-sidebar/filter/flag-field/flag-field.component';
import { DatabaseComponent } from '../database/database.component';
import { DatabaseEntryComponent } from '../database-entry/database-entry.component';
import { PurchaseInfoComponent } from '../purchase-info/purchase-info.component';
import { RatingComponent } from '../rating/rating.component';
import { TeacupimgComponent } from '../teacupimg/teacupimg.component';
import { BasicInfoComponent } from '../database-entry/basic-info/basic-info.component';
import { StatsComponent } from '../database-entry/stats/stats.component';
import { DatabaseEntryImagesComponent } from '../database-entry-images/database-entry-images.component';
import { JournalComponent } from '../journal/journal.component';
import { JournalEntryComponent } from '../journal-entry/journal-entry.component';
import { NaturalLanguageDatePipe } from '../natural-language-date-pipe';
import { SorterComponent } from '../teas-sidebar/sorter/sorter.component';
import { SortFieldComponent } from '../teas-sidebar/sorter/sort-field/sort-field.component';
import { ViewManagerComponent } from '../teas-sidebar/view-manager/view-manager.component';

import { TestUtils } from '../test-utils';
import { ViewService } from '../view.service';

import { APP_BASE_HREF } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';

describe('TeasComponent', () => {
    let component: TeasComponent;
    let fixture: ComponentFixture<TeasComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NgbModule.forRoot(),
                FormsModule,
                AppRoutingModule,
            ],
            declarations: [
                TeasComponent,
                TeasSidebarComponent,
                FilterComponent,
                StringFieldComponent,
                FlagFieldComponent,
                RatingComponent,
                TeacupimgComponent,
                DatabaseComponent,
                DatabaseEntryComponent,
                PurchaseInfoComponent,
                BasicInfoComponent,
                StatsComponent,
                DatabaseEntryImagesComponent,
                JournalComponent,
                JournalEntryComponent,
                NaturalLanguageDatePipe,
                SorterComponent,
                SortFieldComponent,
                ViewManagerComponent,

                HgTeaComponent,
            ],
            providers: [
                ViewService,
                NaturalLanguageDatePipe,
                {provide: APP_BASE_HREF, useValue : '/' }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TeasComponent);
        component = fixture.componentInstance;

        const dummyData = TestUtils.createDummyTea();
        component.teas = [dummyData];

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
