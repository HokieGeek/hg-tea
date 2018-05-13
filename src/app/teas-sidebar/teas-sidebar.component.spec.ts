import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeasSidebarComponent } from './teas-sidebar.component';

describe('TeasSidebarComponent', () => {
    let component: TeasSidebarComponent;
    let fixture: ComponentFixture<TeasSidebarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TeasSidebarComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TeasSidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
