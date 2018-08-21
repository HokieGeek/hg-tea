import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TealistComponent } from './tealist.component';

describe('TealistComponent', () => {
    let component: TealistComponent;
    let fixture: ComponentFixture<TealistComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TealistComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TealistComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
