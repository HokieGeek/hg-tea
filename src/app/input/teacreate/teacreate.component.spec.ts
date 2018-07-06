import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacreateComponent } from './teacreate.component';

describe('TeacreateComponent', () => {
    let component: TeacreateComponent;
    let fixture: ComponentFixture<TeacreateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TeacreateComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TeacreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
