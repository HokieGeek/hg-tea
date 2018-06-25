import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { Tea, TeaBuilder } from '../../tea';

import { BasicInfoComponent } from './basic-info.component';
import { PurchaseInfoComponent } from '../../purchase-info/purchase-info.component';
import { RatingComponent } from '../../rating/rating.component';
import { TeacupimgComponent } from '../../teacupimg/teacupimg.component';

import { TestUtils } from '../../test-utils';

xdescribe('BasicInfoComponent', () => {
    let component: BasicInfoComponent;
    let fixture: ComponentFixture<BasicInfoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule ],
            declarations: [
                RatingComponent,
                TeacupimgComponent,
                PurchaseInfoComponent,
                BasicInfoComponent
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BasicInfoComponent);
        component = fixture.componentInstance;

        const id = TestUtils.createRandomId();
        component.tea = TestUtils.createDummyTea(id);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('data check', () => {
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
            component.tea = new TeaBuilder().from(component.tea).stocked(false).build();
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

        xit('tea type is correct', () => {
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
    });

    describe('check only expected elements created', () => {
        // - in the card-body
        //    need an h4==card-title, h6==card-subtitle
        // - TODO: the rest
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
            component.tea = new TeaBuilder().from(component.tea).country('').build();
            fixture.detectChanges();

            fixture.whenStable().then(result => {
                const has = fixture.debugElement.query(By.css('h6.card-subtitle'));
                expect(has).toBeNull();
            });
        }));

        it('entry country is set but no region', async(() => {
            component.tea = new TeaBuilder().from(component.tea).region('').build();
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
            component.tea = new TeaBuilder().from(component.tea).year(null).build();
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
            component.tea = new TeaBuilder().from(component.tea).flush(null).build();
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
            component.tea = new TeaBuilder().from(component.tea).comments(null).build();
            fixture.detectChanges();

            fixture.whenStable().then(result => {
                const has = fixture.debugElement.query(By.css('p.card-text > .comments'));
                expect(has).toBeNull();
            });
        }));

        it('entry date is not set', async(() => {
            component.tea = new TeaBuilder().from(component.tea).date(null).build();
            fixture.detectChanges();

            fixture.whenStable().then(result => {
                const has = fixture.debugElement.queryAll(By.css('.card-text > small'));
                expect(has.length).toBe(0);
            });
        }));

        xit('tea type is not set', async(() => {
            component.tea = new TeaBuilder().from(component.tea).type(null).build();
            fixture.detectChanges();

            fixture.whenStable().then(result => {
                const has = fixture.debugElement.query(By.css('.card-footer'));
                expect(has).toBeNull();
            });
        }));
    });
});
