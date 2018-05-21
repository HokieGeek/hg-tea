import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SorterComponent } from './sorter.component';

import { SorterService } from '../../sorter.service';

describe('SorterComponent', () => {
    let component: SorterComponent;
    let fixture: ComponentFixture<SorterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SorterComponent ],
            providers: [ SorterService ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SorterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
