import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { InputComponent } from './input.component';
import { SteepTimeComponent } from './steep-time/steep-time.component';
import { RatingComponent } from '../rating/rating.component';
import { TeacupimgComponent } from '../teacupimg/teacupimg.component';
import { UnratedComponent } from './unrated/unrated.component';
import { TeaEditorComponent } from './teaeditor/teaeditor.component';
import { DatetimeComponent } from './datetime/datetime.component';
import { EntryEditComponent } from './entry-edit/entry-edit.component';
import { TeaEditComponent } from './tea-edit/tea-edit.component';
import { PicturesComponent } from './pictures/pictures.component';
import { TealistComponent } from './tealist/tealist.component';
import { AutofillerComponent } from './autofiller/autofiller.component';
import { BulkComponent } from './bulk/bulk.component';

import { EnumValuesPipe } from '../enum-values.pipe';
import { SteeptimePipe } from '../steeptime.pipe';

describe('InputComponent', () => {
    let component: InputComponent;
    let fixture: ComponentFixture<InputComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserModule,
                BrowserAnimationsModule,
                HttpClientModule,
                FormsModule,
                OwlDateTimeModule,
                OwlNativeDateTimeModule,
                NgbTypeaheadModule,
            ],
            declarations: [
                InputComponent,
                UnratedComponent,
                RatingComponent,
                TeacupimgComponent,
                EnumValuesPipe,
                SteepTimeComponent,
                TeaEditorComponent,
                SteeptimePipe,
                DatetimeComponent,
                EntryEditComponent,
                TeaEditComponent,
                PicturesComponent,
                TealistComponent,
                AutofillerComponent,
                BulkComponent,
            ],
            providers: [
                SteeptimePipe,
                HttpClient,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
