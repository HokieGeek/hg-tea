import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { Tea } from '../../tea';

import { StatsComponent } from './stats.component';

import { TestUtils } from '../../test-utils';

describe('StatsComponent', () => {
    let component: StatsComponent;
    let fixture: ComponentFixture<StatsComponent>;

    beforeEach(async(() => {
        // imports: [ FormsModule ],
        TestBed.configureTestingModule({
            declarations: [ StatsComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StatsComponent);
        component = fixture.componentInstance;

        const id = TestUtils.createRandomId();
        component.tea = TestUtils.createDummyTea(id);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
