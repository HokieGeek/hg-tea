import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, ActivatedRoute } from '@angular/router';

import { TeaComponent } from './tea.component';

import { JournalEntryComponent } from '../journal-entry/journal-entry.component';
import { PurchaseInfoComponent } from '../purchase-info/purchase-info.component';
import { DatabaseEntryImagesComponent } from '../database-entry-images/database-entry-images.component';
import { RatingComponent } from '../rating/rating.component';
import { TeacupimgComponent } from '../teacupimg/teacupimg.component';
import { SteeptimePipe } from '../steeptime.pipe';

import { MockActivatedRoute } from '../mockactivatedroute';

describe('TeaComponent', () => {
    let component: TeaComponent;
    let fixture: ComponentFixture<TeaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
            ],
            declarations: [
                TeaComponent,
                JournalEntryComponent,
                PurchaseInfoComponent,
                DatabaseEntryImagesComponent,
                RatingComponent,
                TeacupimgComponent,
                SteeptimePipe,
            ],
            providers: [
                HttpClient,
                { provide: ActivatedRoute, useClass: MockActivatedRoute }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TeaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
