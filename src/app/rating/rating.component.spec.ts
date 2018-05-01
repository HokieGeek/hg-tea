import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { RatingComponent } from './rating.component';
import { TeacupimgComponent } from '../teacupimg/teacupimg.component';

describe('RatingComponent', () => {
    let component: RatingComponent;
    let fixture: ComponentFixture<RatingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ RatingComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RatingComponent);
        component = fixture.componentInstance;

        component.max = (Math.random() * 20) + 2;
        component.rating = Math.random() * component.rating;

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
});
