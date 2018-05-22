import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortFieldComponent } from './sort-field.component';

import { Sorter } from '../../../sorter.service';

describe('SortFieldComponent', () => {
    let component: SortFieldComponent;
    let fixture: ComponentFixture<SortFieldComponent>;

    const dummyName = 'dummyName';
    const dummySorter = new Sorter();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SortFieldComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SortFieldComponent);
        component = fixture.componentInstance;

        component.name = dummyName;
        component.sorter = dummySorter;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
