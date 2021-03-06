import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SorterComponent } from './sorter.component';
import { SortFieldComponent } from './sort-field/sort-field.component';

import { ViewService, Sorter } from '../../view.service';
import { TestUtils } from '../../test-utils';

describe('SorterComponent', () => {
    let component: SorterComponent;
    let fixture: ComponentFixture<SorterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SorterComponent,
                SortFieldComponent
            ],
            providers: [ ViewService ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SorterComponent);
        component = fixture.componentInstance;

        const dummyData = TestUtils.createDummyTea();
        component.teas = [dummyData];

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
