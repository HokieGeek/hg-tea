import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TeacupimgComponent } from './teacupimg.component';

describe('TeacupimgComponent Unselected', () => {
    let component: TeacupimgComponent;
    let fixture: ComponentFixture<TeacupimgComponent>;
    let classes: DOMTokenList

    const defaultClass = 'ratingImg';
    const unselectedClass = 'ratingImgUnselected';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TeacupimgComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TeacupimgComponent);
        component = fixture.componentInstance;

        component.unselect = 'true';

        fixture.detectChanges();

        classes = fixture.debugElement.query(By.css('img')).nativeElement.classList;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('contains default class', () => {
        expect(classes.contains(defaultClass)).toBeTruthy();
    });

    it('has Unselected class', () => {
        expect(classes.contains(unselectedClass)).toBeTruthy();
    });
});

describe('TeacupimgComponent Selected', () => {
    let component: TeacupimgComponent;
    let fixture: ComponentFixture<TeacupimgComponent>;
    let classes: DOMTokenList

    const defaultClass = 'ratingImg';
    const unselectedClass = 'ratingImgUnselected';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TeacupimgComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TeacupimgComponent);
        component = fixture.componentInstance;

        component.unselect = 'false';

        fixture.detectChanges();

        classes = fixture.debugElement.query(By.css('img')).nativeElement.classList;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('contains default class', () => {
        expect(classes.contains(defaultClass)).toBeTruthy();
    });

    it('does not have Unselected class', () => {
        expect(!classes.contains(unselectedClass)).toBeTruthy();
    });
});
