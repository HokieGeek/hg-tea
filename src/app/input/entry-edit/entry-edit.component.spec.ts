import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { EntryEditComponent } from './entry-edit.component';

import { SteepTimeComponent } from '../steep-time/steep-time.component';
import { RatingComponent } from '../../rating/rating.component';
import { TeacupimgComponent } from '../../teacupimg/teacupimg.component';
import { DatetimeComponent } from '../datetime/datetime.component';

import { EnumValuesPipe } from '../../enum-values.pipe';
import { SteeptimePipe } from '../../steeptime.pipe';

import { TestUtils } from '../../test-utils';

describe('EntryEditComponent', () => {
    let component: EntryEditComponent;
    let fixture: ComponentFixture<EntryEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                OwlDateTimeModule,
                OwlNativeDateTimeModule,
            ],
            declarations: [
                EntryEditComponent,
                RatingComponent,
                TeacupimgComponent,
                EnumValuesPipe,
                SteeptimePipe,
                SteepTimeComponent,
                DatetimeComponent,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EntryEditComponent);
        component = fixture.componentInstance;

        component.tea = TestUtils.createDummyTea();

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
