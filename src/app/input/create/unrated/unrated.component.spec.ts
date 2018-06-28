import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnratedComponent } from './unrated.component';

describe('UnratedComponent', () => {
    let component: UnratedComponent;
    let fixture: ComponentFixture<UnratedComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ UnratedComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UnratedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
