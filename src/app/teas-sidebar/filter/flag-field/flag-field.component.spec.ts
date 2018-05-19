import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagFieldComponent } from './flag-field.component';

import { Filter } from '../../../filter.service';

describe('FlagFieldComponent', () => {
    let component: FlagFieldComponent;
    let fixture: ComponentFixture<FlagFieldComponent>;

    const dummyLabel = 'Dummy';
    const dummyName = 'Dummy';
    const dummyFilter = new Filter();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ FlagFieldComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FlagFieldComponent);
        component = fixture.componentInstance;

        component.label = dummyLabel;
        component.name = dummyName;
        component.filter = dummyFilter;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
