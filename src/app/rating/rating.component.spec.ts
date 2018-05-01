import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { RatingComponent } from './rating.component';
import { TeacupimgComponent } from '../teacupimg/teacupimg.component';

import { TestUtils } from '../test-utils';

describe('RatingComponent', () => {
    let component: RatingComponent;
    let fixture: ComponentFixture<RatingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                RatingComponent,
                TeacupimgComponent,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RatingComponent);
        component = fixture.componentInstance;

        // component.max = Math.floor((Math.random() * 20) + 2);
        // component.rating = Math.floor(Math.random() * component.rating);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('title is correct', () => {
        const has = fixture.debugElement.query(By.css('span')).properties['title'];
        const expected = component.rating + ' out of ' + component.max;
        expect(has).toBe(expected);
    });

    it('has the correct number of images', () => {
        let has = 0;
        const nodes = fixture.debugElement.query(By.css('span')).nativeElement.childNodes;

        for (let i = nodes.length - 1; i >= 0; i--) {
            if (nodes[i].nodeName === 'HG-TEACUPIMG') {
                has++;
            }
        }

        expect(has).toBe(component.max);
    });

    it('has images correctly displayed', () => {
        let hasSelected = 0;
        let hasUnselected = 0;

        const nodes = fixture.debugElement.query(By.css('span')).nativeElement.childNodes;
        for (let i = nodes.length - 1; i >= 0; i--) {
            if (nodes[i].nodeName === 'HG-TEACUPIMG') {
                if (nodes[i].attributes.getNamedItem('ng-reflect-selected').value === 'true') {
                    hasSelected++;
                } else {
                    hasUnselected++;
                }
            }
        }

        expect(hasSelected).toBe(component.rating);
        expect(hasUnselected).toBe(component.max - component.rating);
    });

    it('only contains teacupimg elements', () => {
        let countNonTeacupElements = 0;
        const elems = TestUtils.filterDebugNodes(fixture.debugElement.query(By.css('span')).childNodes);
        for (const i in elems) {
            if (elems[i].name !== 'hg-teacupimg') {
                countNonTeacupElements++;
            }
        }
        expect(countNonTeacupElements).toBe(0);
    });
});