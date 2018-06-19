import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { NewSessionComponent } from './new-session.component';

import { RatingComponent } from '../../rating/rating.component';
import { TeacupimgComponent } from '../../teacupimg/teacupimg.component';

describe('NewSessionComponent', () => {
    let component: NewSessionComponent;
    let fixture: ComponentFixture<NewSessionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule ],
            declarations: [
                NewSessionComponent,
                RatingComponent,
                TeacupimgComponent,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewSessionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
