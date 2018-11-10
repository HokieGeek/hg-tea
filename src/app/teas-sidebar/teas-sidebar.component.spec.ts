import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Tea } from '../tea';
import { ViewService, Filter, FilterFlag } from '../view.service';
import { TeasSidebarComponent } from './teas-sidebar.component';

import { FilterComponent } from './filter/filter.component';
import { StringFieldComponent } from './filter/string-field/string-field.component';
import { FlagFieldComponent } from './filter/flag-field/flag-field.component';
import { SorterComponent } from './sorter/sorter.component';
import { SortFieldComponent } from './sorter/sort-field/sort-field.component';
import { ViewManagerComponent } from './view-manager/view-manager.component';

import { TestUtils } from '../test-utils';

describe('TeasSidebarComponent', () => {
    let component: TeasSidebarComponent;
    let fixture: ComponentFixture<TeasSidebarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NgbModule,
                FormsModule
            ],
            declarations: [
                TeasSidebarComponent,
                FilterComponent,
                StringFieldComponent,
                FlagFieldComponent,
                SorterComponent,
                SortFieldComponent,
                ViewManagerComponent,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TeasSidebarComponent);
        component = fixture.componentInstance;

        component.teas = TestUtils.createDummyTeasWithEntries();

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
