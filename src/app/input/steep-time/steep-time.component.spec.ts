import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SteepTimeComponent } from './steep-time.component';

describe('SteepTimeComponent', () => {
    let component: SteepTimeComponent;
    let fixture: ComponentFixture<SteepTimeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SteepTimeComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SteepTimeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
