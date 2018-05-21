import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterComponent } from './filter.component';

import { StringFieldComponent } from './string-field/string-field.component';
import { FlagFieldComponent } from './flag-field/flag-field.component';

import { FilterService } from '../../filter.service';

describe('FilterComponent', () => {
    let component: FilterComponent;
    let fixture: ComponentFixture<FilterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                FilterComponent,
                StringFieldComponent,
                FlagFieldComponent,
            ],
            providers: [ FilterService ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
