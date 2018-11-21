import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { TeaEditComponent } from './tea-edit.component';
import { EnumValuesPipe } from '../../enum-values.pipe';
import { DatetimeComponent } from '../datetime/datetime.component';
import { PicturesComponent } from '../pictures/pictures.component';
import { AutofillerComponent } from '../autofiller/autofiller.component';

import { TestUtils } from '../../test-utils';

describe('TeaEditComponent', () => {
    let component: TeaEditComponent;
    let fixture: ComponentFixture<TeaEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                OwlDateTimeModule,
                OwlNativeDateTimeModule,
                NgbTypeaheadModule,
            ],
            declarations: [
                TeaEditComponent,
                EnumValuesPipe,
                DatetimeComponent,
                PicturesComponent,
                AutofillerComponent,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TeaEditComponent);
        component = fixture.componentInstance;

        component.tea = TestUtils.createDummyTea();

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
