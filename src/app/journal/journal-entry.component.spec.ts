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

    xit('check only expected elements are being rendered', () => {
        // let has = fixture.debugElement;
    });
});
