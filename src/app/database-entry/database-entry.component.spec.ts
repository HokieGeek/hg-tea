import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { DatabaseEntryComponent } from './database-entry.component';
import { PurchaseInfoComponent } from '../purchase-info/purchase-info.component';
import { RatingComponent } from '../rating/rating.component';
import { TeacupimgComponent } from '../teacupimg/teacupimg.component';

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
                DatabaseEntryComponent,
                PurchaseInfoComponent
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

    it('expected id', () => {
        const has = parseInt(fixture.debugElement.query(By.css('input')).properties['value'], 10);
        expect(has).toBe(component.tea.id);
    });

    it('card title is name', () => {
        const has = fixture.debugElement.query(By.css('.card-title')).childNodes[0].nativeNode.nodeValue;
        expect(has).toBe(component.tea.name);
    });

    xit('card title notStocked class matches if tea is stocked', () => {
        const has = fixture.debugElement.query(By.css('.card-title')).attributes['class'].includes('notStocked');
        expect(has).toBe(!component.tea.stocked);
    });

    xit('card title check notStocked is applied when not stocked?', async(() => {
        console.log(component.tea.stocked);
        component.tea.stocked = false;
        fixture.detectChanges();

        fixture.whenStable().then(result => {
            const has = fixture.debugElement.query(By.css('.card-title')).attributes['class'].includes('notStocked');
            console.log(component.tea.stocked);
            console.log(fixture.debugElement.query(By.css('.card-title')).attributes['class']);
            expect(has).toBe(true);
        });
    }));

    it('entry country is set', () => {
        const nodes = fixture.debugElement.query(By.css('h6.card-subtitle')).childNodes;
        let found = false;
        for (const node in nodes) {
            if (nodes[node].nativeNode.nodeName === '#text'
                && nodes[node].nativeNode.nodeValue.includes(component.tea.country)) {
                found = true;
                break;
            }
        }
        expect(found).toBe(true);
    });

    it('entry country is set with region', () => {
        const nodes = fixture.debugElement.query(By.css('h6.card-subtitle > span')).childNodes;
        let found = false;
        for (const node in nodes) {
            if (nodes[node].nativeNode.nodeName === '#text'
                && nodes[node].nativeNode.nodeValue.includes(component.tea.region)) {
                found = true;
                break;
            }
        }
        expect(found).toBe(true);
    });

    it('tea year and flush', () => {
        const nodes = fixture.debugElement.queryAll(By.css('.card-text'));
        let found = false;
        for (let node = nodes.length - 1; node >= 0; node--) {
            const children = nodes[node].childNodes;
            for (const child in children) {
                if (children[child].nativeNode.nodeName === '#text' &&
                    children[child].nativeNode.nodeValue === component.tea.flush + ' ' + component.tea.year) {
                        found = true;
                    break;
                }
            }
        }
        expect(found).toBe(true);
    });

    it('comments are set', () => {
        const nodes = fixture.debugElement.query(By.css('p.card-text > .comments')).childNodes;
        let found = false;
        for (const node in nodes) {
            if (nodes[node].nativeNode.nodeName === '#text'
                && nodes[node].nativeNode.nodeValue.includes(component.tea.comments)) {
                found = true;
                break;
            }
        }
        expect(found).toBe(true);
    });

    it('entry date is correct', () => {
        const nodes = fixture.debugElement.queryAll(By.css('.card-text > small'));
        let found = false;
        for (let node = nodes.length - 1; node >= 0; node--) {
            const children = nodes[node].childNodes;
            for (const child in children) {
                if (children[child].nativeNode.nodeName === '#text' &&
                    children[child].nativeNode.nodeValue === 'Entered on ' + component.tea.date) {
                        found = true;
                    break;
                }
            }
        }
        expect(found).toBe(true);
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
                    && elems[i].attributes['class'].indexOf('card-img-top') < 0) {
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
                expect(elems.length).toBe(8);
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
        it('entry country is not set', async(() => {
            component.tea.country = '';
            fixture.detectChanges();

            fixture.whenStable().then(result => {
                const has = fixture.debugElement.query(By.css('h6.card-subtitle'));
                expect(has).toBeNull();
            });
        }));

        it('entry country is set but no region', async(() => {
            component.tea.region = '';
            fixture.detectChanges();

            fixture.whenStable().then(result => {
                const nodes = fixture.debugElement.queryAll(By.css('h6.card-subtitle > span'));
                let found = false;
                for (const node in nodes) {
                    if (nodes[node].nativeNode.nodeName === '#text'
                        && nodes[node].nativeNode.nodeValue.includes(component.tea.region)) {
                        found = true;
                        break;
                    }
                }
                expect(found).toBe(false);
            });
        }));

        it('no tea year', async(() => {
            component.tea.year = null;
            fixture.detectChanges();

            fixture.whenStable().then(result => {
                const nodes = fixture.debugElement.queryAll(By.css('.card-text'));
                let found = false;
                for (let node = nodes.length - 1; node >= 0; node--) {
                    const children = nodes[node].childNodes;
                    for (const child in children) {
                        if (children[child].nativeNode.nodeName === '#text' &&
                            children[child].nativeNode.nodeValue === component.tea.flush + ' ') {
                            found = true;
                            break;
                        }
                    }
                }
                expect(found).toBe(false);
            });
        }));

        it('have year but with no flush', async(() => {
            component.tea.flush = null;
            fixture.detectChanges();

            fixture.whenStable().then(result => {
                const nodes = fixture.debugElement.queryAll(By.css('.card-text'));
                let found = false;
                for (let node = nodes.length - 1; node >= 0; node--) {
                    const children = nodes[node].childNodes;
                    for (const child in children) {
                        if (children[child].nativeNode.nodeName === '#text' &&
                            children[child].nativeNode.nodeValue === component.tea.flush + ' ' + component.tea.year) {
                            found = true;
                            break;
                        }
                    }
                }
                expect(found).toBe(false);
            });
        }));

        it('comments are not set', async(() => {
            component.tea.comments = null;
            fixture.detectChanges();

            fixture.whenStable().then(result => {
                const has = fixture.debugElement.query(By.css('p.card-text > .comments'));
                expect(has).toBeNull();
            });
        }));

        it('entry date is not set', async(() => {
            component.tea.date = null;
            fixture.detectChanges();

            fixture.whenStable().then(result => {
                const has = fixture.debugElement.queryAll(By.css('.card-text > small'));
                expect(has.length).toBe(0);
            });
        }));

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
