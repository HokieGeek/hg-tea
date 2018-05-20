import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Tea } from '../tea';
import { FilterService, Filter, FilterFlag } from '../filter.service';
import { TeasSidebarComponent } from './teas-sidebar.component';

import { FilterComponent } from './filter/filter.component';
import { StringFieldComponent } from './filter/string-field/string-field.component';
import { FlagFieldComponent } from './filter/flag-field/flag-field.component';
import { SorterComponent } from './sorter/sorter.component';
import { CriteriaComponent } from './sorter/criteria/criteria.component';

import { TestUtils } from '../test-utils';

describe('TeasSidebarComponent', () => {
    let component: TeasSidebarComponent;
    let fixture: ComponentFixture<TeasSidebarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NgbModule.forRoot(),
                FormsModule
            ],
            declarations: [
                TeasSidebarComponent,
                FilterComponent,
                StringFieldComponent,
                FlagFieldComponent,
                SorterComponent,
                CriteriaComponent,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TeasSidebarComponent);
        component = fixture.componentInstance;

        const dummyData = TestUtils.createDummyTeasWithEntries();
        component.teas = dummyData.teas; // TODO

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
