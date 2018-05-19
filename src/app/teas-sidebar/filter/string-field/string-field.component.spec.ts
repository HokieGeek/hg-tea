import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StringFieldComponent } from './string-field.component';

import { Filter } from '../../../filter.service';

describe('StringFieldComponent', () => {
    let component: StringFieldComponent;
    let fixture: ComponentFixture<StringFieldComponent>;

    const dummyLabel = 'Dummy';
    const dummyName = 'Dummy';
    const dummyValues = ['Dummy1', 'Dummy2'];
    const dummyFilter = new Filter();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ StringFieldComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StringFieldComponent);
        component = fixture.componentInstance;

        component.label = dummyLabel;
        component.name = dummyName;
        component.values = dummyValues;
        component.filter = dummyFilter;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
