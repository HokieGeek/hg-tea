import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeasComponent } from './teas.component';

describe('TeasComponent', () => {
    let component: TeasComponent;
    let fixture: ComponentFixture<TeasComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TeasComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TeasComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
