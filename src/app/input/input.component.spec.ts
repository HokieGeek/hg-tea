import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import { NewSessionComponent } from './new-session/new-session.component';
import { ContinueSessionComponent } from './continue-session/continue-session.component';

describe('InputComponent', () => {
    let component: InputComponent;
    let fixture: ComponentFixture<InputComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                InputComponent,
                NewSessionComponent,
                ContinueSessionComponent,
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
