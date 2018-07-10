import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { TeaEditorComponent } from './teaeditor.component';
import { SteepTimeComponent } from '../steep-time/steep-time.component';
import { RatingComponent } from '../../rating/rating.component';
import { TeacupimgComponent } from '../../teacupimg/teacupimg.component';
import { DatetimeComponent } from '../datetime/datetime.component';
import { EntryEditComponent } from '../entry-edit/entry-edit.component';
import { TeaEditComponent } from '../tea-edit/tea-edit.component';

import { EnumValuesPipe } from '../../enum-values.pipe';
import { SteeptimePipe } from '../../steeptime.pipe';

import { TestUtils } from '../../test-utils';

describe('TeaEditorComponent', () => {
    let component: TeaEditorComponent;
    let fixture: ComponentFixture<TeaEditorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                OwlDateTimeModule,
                OwlNativeDateTimeModule,
            ],
            declarations: [
                TeaEditorComponent,
                RatingComponent,
                TeacupimgComponent,
                EnumValuesPipe,
                SteeptimePipe,
                SteepTimeComponent,
                DatetimeComponent,
                EntryEditComponent,
                TeaEditComponent,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TeaEditorComponent);
        component = fixture.componentInstance;

        component.tea = TestUtils.createDummyTea();

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
