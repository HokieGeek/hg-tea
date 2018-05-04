import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { DatabaseEntryComponent } from './database-entry.component';
import { PurchaseInfoComponent } from '../purchase-info/purchase-info.component';
import { RatingComponent } from '../rating/rating.component';
import { TeacupimgComponent } from '../teacupimg/teacupimg.component';
import { DatabaseEntryImagesComponent } from '../database-entry-images/database-entry-images.component';

import { TestUtils } from '../test-utils';

describe('DatabaseEntryComponent', () => {
    let component: DatabaseEntryComponent;
    let fixture: ComponentFixture<DatabaseEntryComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule ],
            declarations: [
                RatingComponent,
                TeacupimgComponent,
                PurchaseInfoComponent,
                DatabaseEntryImagesComponent,
                DatabaseEntryComponent,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DatabaseEntryComponent);
        component = fixture.componentInstance;

        const id = TestUtils.createRandomId();
        component.tea = TestUtils.createDummyTea(id);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('tea type is correct', () => {
        const nodes = fixture.debugElement.query(By.css('.card-footer')).childNodes;
        let found = false;
        for (const node in nodes) {
            if (nodes[node].nativeNode.nodeName === '#text'
                && nodes[node].nativeNode.nodeValue.includes(component.tea.type)) {
                found = true;
                break;
            }
        }
        expect(found).toBe(true);
    });

    describe('check only expected elements created', () => {
        // - Only one top-level element
        // - one card with one body and one footer
        //     the footer must be the entrydate
        // - in the card-body
        //    need an h4==card-title, h6==card-subtitle
        // - TODO: the rest
        it('card is only top-level element', () => {
            // > Check top element
            const elems = TestUtils.filterDebugNodes(fixture.debugElement.childNodes);
            for (const i in elems) {
                if (elems[i].name !== 'div' || elems[i].attributes['class'] !== 'card') {
                    fail('Found an unexpected element');
                }
            }
            expect(elems.length).toBe(1);
        });

        it('children of card are only a card-body and a footer', () => {
            // > One card with one body and one footer
            const elems = TestUtils.filterDebugNodes(fixture.debugElement.query(By.css('.card')).childNodes);
            expect(elems.length).toBe(3);

            for (const i in elems) {
                if (elems[i].attributes['class'].indexOf('card-body') < 0
                    && elems[i].attributes['class'].indexOf('card-footer') < 0
                    && elems[i].attributes['class'].indexOf('card-header') < 0
                    && elems[i].attributes['class'].indexOf('card-img-top') < 0) {
                    fail('Found an unexpected element');
                }
            }
        });
    });

    describe('missing data', () => {
        it('tea type is not set', async(() => {
            component.tea.type = null;
            fixture.detectChanges();

            fixture.whenStable().then(result => {
                const has = fixture.debugElement.query(By.css('.card-footer'));
                expect(has).toBeNull();
            });
        }));
    });
});