import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeaEditComponent } from './tea-edit.component';

describe('TeaEditComponent', () => {
    let component: TeaEditComponent;
    let fixture: ComponentFixture<TeaEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TeaEditComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TeaEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
