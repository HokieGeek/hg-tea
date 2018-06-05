import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StringFieldComponent } from './string-field.component';

import { Filter } from '../../../view.service';

describe('StringFieldComponent', () => {
    let component: StringFieldComponent;
    let fixture: ComponentFixture<StringFieldComponent>;

    const dummyName = 'Dummy';
    const dummyValues = ['Dummy1', 'Dummy2'];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ StringFieldComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StringFieldComponent);
        component = fixture.componentInstance;

        component.name = dummyName;
        component.values = dummyValues;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
