import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { DatabaseEntryComponent } from './database-entry.component';

import { TestUtils } from '../test-utils';

describe('DatabaseEntryComponent', () => {
    let component: DatabaseEntryComponent;
    let fixture: ComponentFixture<DatabaseEntryComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule ],
            declarations: [
                DatabaseEntryComponent
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

    xit('expected id', () => {
    });

    xit('card title is name', () => {
    });

    xit('card title has notStocked class when not stocked', () => {
    });

    xit('entry country is set', () => {
    });

    xit('entry country is set with region', () => {
    });

    xit('tea year and flush', () => {
    });

    describe('purchase information', () => {
        xit('size', () => {
        });

        xit('location', () => {
        });

        xit('date', () => {
        });

        xit('price', () => {
        });
    });

    xit('comments are set', () => {
    });

    xit('entry date is correct', () => {
    });

    xit('tea type is correct', () => {
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
            expect(elems.length).toBe(2);

            for (const i in elems) {
                if (elems[i].attributes['class'].indexOf('card-body') < 0
                    && elems[i].attributes['class'].indexOf('card-footer') < 0) {
                    fail('Found an unexpected element');
                }
            }
        });

        describe('card-body composition', () => {
            let cardBody: DebugElement;

            const elemPosCardTitle = 1;
            const elemPosCardSubtitle = 2;
            // const elemPosCardText = 2;

            beforeEach(() => {
                cardBody = fixture.debugElement.query(By.css('.card-body'));
            });

            it('expected number of subelements', () => {
                const elems = TestUtils.filterDebugNodes(cardBody.childNodes);
                expect(elems.length).toBe(7);
            });

            it('id hidden input exists', () => {
                const hidden = cardBody.query(By.css('input'));
                const hasId = parseInt(hidden.properties['value'], 10);
                expect(hidden).toBeTruthy();
                expect(hasId).toBe(component.tea.id);
            });

            it('card-title exists and is correctly placed', () => {
                const elems = TestUtils.filterDebugNodes(cardBody.childNodes);
                const elem = elems[elemPosCardTitle];
                expect(elem.attributes['class'].indexOf('card-title')).not.toBeLessThan(0);
                expect(elem.name).toBe('h4');
            });

            it('card-title has no child elements', () => {
                const elems = TestUtils.filterDebugNodes(cardBody.childNodes);
                const children = TestUtils.filterDebugNodes(elems[elemPosCardTitle].childNodes);
                expect(children.length).toBe(0);
            });

            it('card-subtitle exists and is correctly placed', () => {
                const elems = TestUtils.filterDebugNodes(cardBody.childNodes);
                const elem = elems[elemPosCardSubtitle];
                expect(elem.attributes['class'].indexOf('card-subtitle')).not.toBeLessThan(0);
                expect(elem.name).toBe('h6');
            });

            it('card-subtitle has only 1 child element', () => {
                const elems = TestUtils.filterDebugNodes(cardBody.childNodes);
                const children = TestUtils.filterDebugNodes(elems[elemPosCardSubtitle].childNodes);
                expect(children.length).toBe(1);
            });

            // TODO
        });
    });

    describe('missing data', () => {
        xit('entry country is set', () => {
        });

        xit('entry country is set with region', () => {
        });

        xit('tea year and flush', () => {
        });

        describe('purchase information', () => {
            xit('size', () => {
            });

            xit('location', () => {
            });

            xit('date', () => {
            });

            xit('price', () => {
            });
        });

        xit('comments are set', () => {
        });

        xit('entry date is correct', () => {
        });

        xit('tea type is correct', () => {
        });
    });
});
