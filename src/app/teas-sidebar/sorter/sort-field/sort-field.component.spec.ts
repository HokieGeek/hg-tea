import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortFieldComponent } from './sort-field.component';

import { Sorter } from '../../../view.service';

describe('SortFieldComponent', () => {
    let component: SortFieldComponent;
    let fixture: ComponentFixture<SortFieldComponent>;

    const dummyName = 'dummyName';

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

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
