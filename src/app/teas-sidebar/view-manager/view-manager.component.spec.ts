import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewManagerComponent } from './view-manager.component';

describe('ViewManagerComponent', () => {
    let component: ViewManagerComponent;
    let fixture: ComponentFixture<ViewManagerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule ],
            declarations: [ ViewManagerComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ViewManagerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
