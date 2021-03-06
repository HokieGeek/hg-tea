import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { JournalEntryComponent } from './journal-entry.component';
import { RatingComponent } from '../rating/rating.component';
import { TeacupimgComponent } from '../teacupimg/teacupimg.component';
import { NaturalLanguageDatePipe } from '../natural-language-date-pipe';
import { SteeptimePipe } from '../steeptime.pipe';

import { EntryBuilder } from '../tea';
import { TestUtils } from '../test-utils';

describe('JournalEntryComponent', () => {
    let component: JournalEntryComponent;
    let fixture: ComponentFixture<JournalEntryComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule ],
            declarations: [
                NaturalLanguageDatePipe,
                RatingComponent,
                TeacupimgComponent,
                JournalEntryComponent,
                SteeptimePipe
            ],
            providers: [
                NaturalLanguageDatePipe,
                SteeptimePipe
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JournalEntryComponent);
        component = fixture.componentInstance;

        const id = TestUtils.createRandomId();
        component.entry = TestUtils.createDummyEntry(id);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('fixins list makes sense', () => {
        const has = fixture.debugElement.query(By.css('#fixins')).nativeElement.innerHTML;
        const expected = document.createElement('div').innerHTML = '&nbsp;with&nbsp;'
            + component.fixinsStr.replace(/&/gi, '&amp;').toLowerCase();
        expect(has).toBe(expected);
    });

    it('steeptime is correct', () => {
        const has = fixture.debugElement.query(By.css('#steeptime')).nativeElement.innerText;
        const pipe = new SteeptimePipe();
        expect(has).toBe(pipe.transform(component.entry.steeptime));
    });

    it('steeping vessel is correct', () => {
        const has = fixture.debugElement.query(By.css('#vessel')).nativeElement.innerHTML;
        const expected = document.createElement('span').innerHTML = '&nbsp;using the ' + component.entry.steepingvessel.toLowerCase();
        expect(has).toBe(expected);
    });

    it('temperature is correct', async(() => {
        component.entry = new EntryBuilder().from(component.entry).steeptemperature(203).build();
        fixture.detectChanges();

        fixture.whenStable().then(result => {
            const has = fixture.debugElement.query(By.css('#temperature')).nativeElement.innerHTML;
            const expected = document.createElement('span').innerHTML = '&nbsp;at ' + component.entry.steeptemperature + ' °F';
            expect(has).toBe(expected);
        });
    }));

    it('comments field is correct', () => {
        const has = fixture.debugElement.query(By.css('#comments')).nativeElement.childNodes.item(0).nodeValue;
        expect(has).toBe(component.entry.comments);
    });

    it('entrydate title is correct', () => {
        const has = fixture.debugElement.query(By.css('#entrydate')).properties['title'];
        console.log('DATE:', has, (new Date()).getTime(), (new Date(has)).getTime(), component.entry.datetime.getTime());
        // pending('This fails sometimes, with invalid date...');
        expect((new Date(has)).getTime()).toBe(component.entry.datetime.getTime());
    });

    xit('entrydate is being displayed naturally', () => {
        // TODO: evaluating this
        const has = fixture.debugElement.query(By.css('#entrydate')).nativeElement.innerText;
        const pipe = new NaturalLanguageDatePipe();
        expect(has).toBe(pipe.transform(component.entry.datetime));
    });

    it('no fixins handled correctly', async(() => {
        component.entry = new EntryBuilder().from(component.entry).fixins([]).build();
        fixture.detectChanges();

        fixture.whenStable().then(result => {
            const has = fixture.debugElement.query(By.css('h6'));
            expect(has).toBeNull();
        });
    }));

    xit('no steeptime is handled correctly', async(() => {
        component.entry = new EntryBuilder().from(component.entry).steeptime(-1).build();
        fixture.detectChanges();

        fixture.whenStable().then(result => {
            const has = fixture.debugElement.query(By.css('#steeptime'));
            expect(has).toBeNull();
        });
    }));

    it('no steeping vessel is handled correctly', async(() => {
        component.entry = new EntryBuilder().from(component.entry).steepingvessel_idx(null).build();
        fixture.detectChanges();

        fixture.whenStable().then(result => {
            const has = fixture.debugElement.query(By.css('#vessel'));
            expect(has).toBeNull();
        });
    }));

    it('no temperature is handled correctly', async(() => {
        component.entry = new EntryBuilder().from(component.entry).steeptemperature(null).build();
        fixture.detectChanges();

        fixture.whenStable().then(result => {
            const has = fixture.debugElement.query(By.css('#temperature'));
            expect(has).toBeNull();
        });
    }));

    it('empty comments field is handled correctly', async(() => {
        component.entry = new EntryBuilder().from(component.entry).comments('').build();
        fixture.detectChanges();

        fixture.whenStable().then(result => {
            const has = fixture.debugElement.query(By.css('.comments'));
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
        xit('li is only top-level element', () => {
            // > Check top element
            const elems = TestUtils.filterDebugNodes(fixture.debugElement.childNodes);
            for (const i in elems) {
                if (elems[i].name !== 'li' || elems[i].attributes['class'].indexOf('list-group-item') < 0) {
                    fail('Found an unexpected element');
                }
            }
            expect(elems.length).toBe(1);
        });

        xit('children of li are only a thing and a footer', () => {
            // > One card with one body and one footer
            const elems = TestUtils.filterDebugNodes(fixture.debugElement.query(By.css('.list-group-item')).childNodes);
            expect(elems.length).toBe(4);

            for (const i in elems) {
                if (elems[i].name !== 'div') {
                    fail('Found an unexpected element');
                }
            }
        });

        xdescribe('composition', () => {
            let entryBody: DebugElement;

            const elemPosCardTitle = 0;
            const elemPosCardSubtitle = 1;
            const elemPosCardText = 2;

            beforeEach(() => {
                entryBody = fixture.debugElement.query(By.css('li'));
            });

            it('expected number of subelements', () => {
                const elems = TestUtils.filterDebugNodes(entryBody.childNodes);
                expect(elems.length).toBe(4);
            });

            it('title exists and is first element', () => {
                const elems = TestUtils.filterDebugNodes(entryBody.childNodes);
                const elem = elems[elemPosCardTitle];
                expect(elem.attributes['id'].indexOf('title')).not.toBeLessThan(0);
                expect(elem.name).toBe('div');
            });

            xit('title has no child elements', () => {
                const elems = TestUtils.filterDebugNodes(entryBody.childNodes);
                const children = TestUtils.filterDebugNodes(elems[elemPosCardTitle].childNodes);
                expect(children.length).toBe(0);
            });

            it('subtitle exists and is second element', () => {
                const elems = TestUtils.filterDebugNodes(entryBody.childNodes);
                const elem = elems[elemPosCardSubtitle];
                expect(elem.attributes['id'].indexOf('fixins')).not.toBeLessThan(0);
                expect(elem.name).toBe('div');
            });

            it('subtitle has no child elements', () => {
                const elems = TestUtils.filterDebugNodes(entryBody.childNodes);
                const children = TestUtils.filterDebugNodes(elems[elemPosCardSubtitle].childNodes);
                expect(children.length).toBe(0);
            });

            xit('card-text exists and is third element', () => {
                const elems = TestUtils.filterDebugNodes(entryBody.childNodes);
                const elem = elems[elemPosCardText];
                expect(elem.attributes['class'].indexOf('card-text')).not.toBeLessThan(0);
                expect(elem.name).toBe('div');
            });

            xit('card-text has at least one child element', () => {
                const elems = TestUtils.filterDebugNodes(entryBody.childNodes);
                const children = TestUtils.filterDebugNodes(elems[elemPosCardText].childNodes);
                expect(children.length).toBeGreaterThan(0);
            });

            xit('card-text only has expected elements', () => {
                let numExpectedElemChildren = 0;
                let countNonExpectedElements = 0;
                const elems = TestUtils.filterDebugNodes(entryBody.query(By.css('.card-text')).childNodes);
                for (let i = elems.length - 1; i >= 0; i--) {
                    switch (elems[i].attributes['id']) {
                        case 'steeptime': numExpectedElemChildren = 0; break;
                        case 'vessel': numExpectedElemChildren = 0; break;
                        case 'temperature': numExpectedElemChildren = 0; break;
                        case 'comments': numExpectedElemChildren = 0; break;
                        case 'rating': numExpectedElemChildren = 1; break;
                        default: countNonExpectedElements++; break;
                    }

                    const children = TestUtils.filterDebugNodes(elems[i].childNodes);
                    expect(children.length).toBe(numExpectedElemChildren);
                }

                expect(countNonExpectedElements).toBe(0);
            });
        });
    });
});
