import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { TeaEditorComponent } from './teaeditor.component';
import { SteepTimeComponent } from '../steep-time/steep-time.component';
import { RatingComponent } from '../../rating/rating.component';
import { TeacupimgComponent } from '../../teacupimg/teacupimg.component';
import { DatetimeComponent } from '../datetime/datetime.component';
import { EntryEditComponent } from '../entry-edit/entry-edit.component';
import { TeaEditComponent } from '../tea-edit/tea-edit.component';
import { PicturesComponent } from '../pictures/pictures.component';
import { AutofillerComponent } from '../autofiller/autofiller.component';

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
                NgbTypeaheadModule,
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
                PicturesComponent,
                AutofillerComponent,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TeaEditorComponent);
        component = fixture.componentInstance;

        component.tea = TestUtils.createDummyTea();
        component.teas = TestUtils.createDummyTeas();

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
