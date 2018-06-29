import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { SessionComponent } from './session.component';
import { SteepTimeComponent } from '../create/steep-time/steep-time.component';
import { RatingComponent } from '../../rating/rating.component';
import { TeacupimgComponent } from '../../teacupimg/teacupimg.component';

import { EnumValuesPipe } from '../../enum-values.pipe';

import { TestUtils } from '../../test-utils';

describe('SessionComponent', () => {
    let component: SessionComponent;
    let fixture: ComponentFixture<SessionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                OwlDateTimeModule,
                OwlNativeDateTimeModule,
            ],
            declarations: [
                SessionComponent,
                RatingComponent,
                TeacupimgComponent,
                EnumValuesPipe,
                SteepTimeComponent,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SessionComponent);
        component = fixture.componentInstance;

        component.tea = TestUtils.createDummyTea();

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
