import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { UnratedComponent } from './unrated.component';
import { RatingComponent } from '../../rating/rating.component';
import { TeacupimgComponent } from '../../teacupimg/teacupimg.component';

import { SteeptimePipe } from '../../steeptime.pipe';

import { TestUtils } from '../../test-utils';

describe('UnratedComponent', () => {
    let component: UnratedComponent;
    let fixture: ComponentFixture<UnratedComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
            ],
            declarations: [
                UnratedComponent,
                RatingComponent,
                TeacupimgComponent,
                SteeptimePipe,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UnratedComponent);
        component = fixture.componentInstance;

        component.tea = TestUtils.createDummyTea();
        component.entry = TestUtils.createDummyEntry();

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
