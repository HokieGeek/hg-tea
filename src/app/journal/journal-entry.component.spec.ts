import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { JournalEntryComponent } from './journal-entry.component';
import { TeacupimgComponent } from '../teacupimg/teacupimg.component';
import { NaturalLanguageDatePipe } from '../natural-language-date-pipe'

import { TestUtils } from '../test-utils'

describe('JournalEntryComponent', () => {
    let component: JournalEntryComponent;
    let fixture: ComponentFixture<JournalEntryComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule ],
            declarations: [
                NaturalLanguageDatePipe,
                TeacupimgComponent,
                JournalEntryComponent
            ],
            providers: [ NaturalLanguageDatePipe ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JournalEntryComponent);
        component = fixture.componentInstance;

        let id = TestUtils.createRandomId();
        component.entry = TestUtils.createDummyEntry(id);
        component.tea = TestUtils.createDummyTea(id);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('name is set correctly', () => {
        expect(fixture.debugElement.query(By.css('h4')).nativeElement.innerText).toBe(component.tea.name);
    });

    it('name title is set correctly', () => {
        let has = fixture.debugElement.query(By.css('h4')).properties['title'];
        let expected = component.tea.type + ' from ' + component.tea.country;
        expect(has).toBe(expected);
    });

    it('fixins list makes sense', () => {
        let has = fixture.debugElement.query(By.css('h6')).nativeElement.innerHTML;
        let expected = document.createElement('h6').innerHTML = 'with&nbsp;' + component.entry.fixins.replace(/&/gi, '&amp;').toLowerCase();
        expect(has).toBe(expected);
    });

    it('steeptime is correct', () => {
        let has = fixture.debugElement.query(By.css('#steeptime')).nativeElement.innerText;
        expect(has).toBe(component.entry.steeptime);
    });

    it('steeping vessel is correct', () => {
        let has = fixture.debugElement.query(By.css('#vessel')).nativeElement.innerText;
        expect(has).toBe('in a ' + component.entry.steepingvessel.toLowerCase());
    });

    it('temperature is correct', () => {
        let has = fixture.debugElement.query(By.css('#temperature')).nativeElement.innerText;
        expect(has).toBe('at ' + component.entry.steeptemperature + ' °F');
    });

    it('comments field is correct', () => {
        let has = fixture.debugElement.query(By.css('#comments')).nativeElement.childNodes.item(2).nodeValue;
        expect(has).toBe(component.entry.comments);
    });

    it('rating title is correct', () => {
        let has = fixture.debugElement.query(By.css('#rating')).properties['title'];
        let expected = component.entry.rating + ' out of ' + TestUtils.numRatingValues;
        expect(has).toBe(expected);
    });

    it('rating has the correct number of images', () => {
        let has = 0;
        let nodes = fixture.debugElement.query(By.css('#rating')).nativeElement.childNodes;

        for (let i = nodes.length - 1; i >= 0; i--) {
            if (nodes[i].nodeName === 'TEACUPIMG') {
                has++;
            }
        }

        expect(has).toBe(TestUtils.numRatingValues);
    });

    it('rating has images correctly displayed', () => {
        let hasSelected = 0;
        let hasUnselected = 0;

        let nodes = fixture.debugElement.query(By.css('#rating')).nativeElement.childNodes;
        for (let i = nodes.length - 1; i >= 0; i--) {
            if (nodes[i].nodeName === 'TEACUPIMG') {
                if (nodes[i].attributes.getNamedItem('ng-reflect-selected').value === 'true') {
                    hasSelected++;
                } else {
                    hasUnselected++;
                }
            }
        }

        expect(hasSelected).toBe(component.entry.rating);
        expect(hasUnselected).toBe(TestUtils.numRatingValues - component.entry.rating);
    });

    it('entrydate title is correct', () => {
        let has = fixture.debugElement.query(By.css('#entrydate')).properties['title'];
        // console.log((new Date(has)).getTime(), ';', component.entry.datetime.getTime());
        // pending('This fails sometimes, with invalid date...');
        expect((new Date(has)).getTime()).toBe(component.entry.datetime.getTime());
    });

    it('entrydate is being displayed naturally', () => {
        let has = fixture.debugElement.query(By.css('#entrydate')).nativeElement.innerText;
        let pipe = new NaturalLanguageDatePipe()
        expect(has).toBe(pipe.transform(component.entry.datetime));
    });

    it('no fixins handled correctly', async(() => {
        component.entry.fixins_list = '';
        fixture.detectChanges();

        fixture.whenStable().then(result => {
            let has = fixture.debugElement.query(By.css('h6'));
            expect(has).toBeNull();
        });
    }));

    it('no steeptime is handled correctly', async(() => {
        component.entry.steeptime = '';
        fixture.detectChanges();

        fixture.whenStable().then(result => {
            let has = fixture.debugElement.query(By.css('#steeptime'));
            expect(has).toBeNull();
        });
    }));

    it('no steeping vessel is handled correctly', async(() => {
        component.entry.steepingvessel_idx = null;
        fixture.detectChanges();

        fixture.whenStable().then(result => {
            let has = fixture.debugElement.query(By.css('#vessel'));
            expect(has).toBeNull();
        });
    }));

    it('no temperature is handled correctly', async(() => {
        component.entry.steeptemperature = null;
        fixture.detectChanges();

        fixture.whenStable().then(result => {
            let has = fixture.debugElement.query(By.css('#temperature'));
            expect(has).toBeNull();
        });
    }));

    it('empty comments field is handled correctly', async(() => {
        component.entry.comments = '';
        fixture.detectChanges();

        fixture.whenStable().then(result => {
            let has = fixture.debugElement.query(By.css('#comments'));
            expect(has).toBeNull();
        });
    }));


    describe('check only expected elements created', () => {
        // - Only one top-level element
        // - one card with one body and one footer
        //     the footer must be the entrydate
        // - in the card-body
        //    need an h4==card-title, h6==card-text and p==card-text
        // - in the card-text  a bunch of spans:
        //    steeptime, vessel, temperature, comments and ratings
        // - ratings only has teacupimg elements
        it('card is only top-level element', () => {
            // > Check top element
            let elems = TestUtils.filterDebugNodes(fixture.debugElement.childNodes);
            for (let i in elems) {
                if (elems[i].name !== 'div' || elems[i].attributes['class'] !== 'card') {
                    fail('Found an unexpected element');
                }
            }
            expect(elems.length).toBe(1);
        });

        it('children of card are only a card-body and a footer', () => {
            // > One card with one body and one footer
            let elems = TestUtils.filterDebugNodes(fixture.debugElement.query(By.css('.card')).childNodes);
            expect(elems.length).toBe(2);

            for (let i in elems) {
                if (elems[i].attributes['class'].indexOf('card-body') < 0
                    && elems[i].attributes['class'].indexOf('card-footer') < 0) {
                    fail('Found an unexpected element');
                }
            }
        });

        describe('card-body composition', () => {
            let cardBody: DebugElement;

            const elemPosCardTitle = 0;
            const elemPosCardSubtitle = 1;
            const elemPosCardText = 2;

            beforeEach(() => {
                cardBody = fixture.debugElement.query(By.css('.card-body'));
            });

            it('expected number of subelements', () => {
                let elems = TestUtils.filterDebugNodes(cardBody.childNodes);
                expect(elems.length).toBe(3);
            });

            it('card-title exists and is first element', () => {
                let elems = TestUtils.filterDebugNodes(cardBody.childNodes);
                let elem = elems[elemPosCardTitle];
                expect(elem.attributes['class'].indexOf('card-title')).not.toBeLessThan(0);
                expect(elem.name).toBe('h4');
            });

            it('card-title has no child elements', () => {
                let elems = TestUtils.filterDebugNodes(cardBody.childNodes);
                let children = TestUtils.filterDebugNodes(elems[elemPosCardTitle].childNodes);
                expect(children.length).toBe(0);
            });

            it('card-subtitle exists and is second element', () => {
                let elems = TestUtils.filterDebugNodes(cardBody.childNodes);
                let elem = elems[elemPosCardSubtitle];
                expect(elem.attributes['class'].indexOf('card-subtitle')).not.toBeLessThan(0);
                expect(elem.name).toBe('h6');
            });

            it('card-subtitle has no child elements', () => {
                let elems = TestUtils.filterDebugNodes(cardBody.childNodes);
                let children = TestUtils.filterDebugNodes(elems[elemPosCardSubtitle].childNodes);
                expect(children.length).toBe(0);
            });

            it('card-text exists and is third element', () => {
                let elems = TestUtils.filterDebugNodes(cardBody.childNodes);
                let elem = elems[elemPosCardText];
                expect(elem.attributes['class'].indexOf('card-text')).not.toBeLessThan(0);
                expect(elem.name).toBe('p');
            });

            it('card-text has at least one child element', () => {
                let elems = TestUtils.filterDebugNodes(cardBody.childNodes);
                let children = TestUtils.filterDebugNodes(elems[elemPosCardText].childNodes);
                expect(children.length).toBeGreaterThan(0);
            });

            it('card-text only has expected elements', () => {
                let numExpectedElemChildren = 0;
                let countNonExpectedElements = 0;
                let elems = TestUtils.filterDebugNodes(cardBody.query(By.css('.card-text')).childNodes);
                for (let i = elems.length - 1; i >= 0; i--) {
                    switch (elems[i].attributes['id']) {
                        case 'steeptime': numExpectedElemChildren = 0; break;
                        case 'vessel': numExpectedElemChildren = 0; break;
                        case 'temperature': numExpectedElemChildren = 0; break;
                        case 'comments': numExpectedElemChildren = 2; break;
                        case 'rating': numExpectedElemChildren = 4; break;
                        default: countNonExpectedElements++; break;
                    }

                    let children = TestUtils.filterDebugNodes(elems[i].childNodes);
                    expect(children.length).toBe(numExpectedElemChildren);
                }

                expect(countNonExpectedElements).toBe(0);
            });

            it('rating only contains teacupimg elements', () => {
                let countNonTeacupElements = 0;
                // let elems = TestUtils.filterDebugNodes(fixture.debugElement.query(By.css('#rating')).childNodes);
                let elems = TestUtils.filterDebugNodes(cardBody.query(By.css('#rating')).childNodes);
                for (let i in elems) {
                    if (elems[i].name !== 'teacupimg') {
                        countNonTeacupElements++;
                    }
                }
                expect(countNonTeacupElements).toBe(0);
            });
        });
    });
});
