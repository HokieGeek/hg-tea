import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PurchaseInfoComponent } from './purchase-info.component';

import { TestUtils } from '../test-utils';

describe('PurchaseInfoComponent', () => {
    let component: PurchaseInfoComponent;
    let fixture: ComponentFixture<PurchaseInfoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ PurchaseInfoComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PurchaseInfoComponent);
        component = fixture.componentInstance;

        const id = TestUtils.createRandomId();
        component.tea = TestUtils.createDummyTea(id);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('full data', () => {
        let purchaseComponent: DebugElement;

        beforeEach(() => {
            purchaseComponent = fixture.debugElement.query(By.css('p.purchase-info'));
        });

        xit('size', () => {
            console.log(fixture.debugElement.query(By.css('p.purchase-info')));
            // console.log(purchaseComponent);
        });

        xit('location', () => {
        });

        xit('date', () => {
        });

        xit('price', () => {
        });
    });

    describe('missing data', () => {
        xit('size', () => {
        });

        xit('location', () => {
        });

        xit('date', () => {
        });

        xit('price', () => {
        });
    });
});
