import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { InputComponent } from './input.component';
import { CreateComponent } from './create/create.component';
import { SteepTimeComponent } from './create/steep-time/steep-time.component';
import { RatingComponent } from '../rating/rating.component';
import { TeacupimgComponent } from '../teacupimg/teacupimg.component';

import { EnumValuesPipe } from '../enum-values.pipe';

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
            ],
            declarations: [
                InputComponent,
                CreateComponent,
                RatingComponent,
                TeacupimgComponent,
                EnumValuesPipe,
                SteepTimeComponent,
            ],
            providers: [
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
