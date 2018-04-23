import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TeacupimgComponent } from './teacupimg.component';

describe('TeacupimgComponent', () => {
    let component: TeacupimgComponent;
    let fixture: ComponentFixture<TeacupimgComponent>;

    const unselectedClass = 'unselected';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TeacupimgComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TeacupimgComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('does not have Unselected class when selected', async(() => {
        component.selected = 'true';
        fixture.detectChanges();

        let classes = fixture.debugElement.query(By.css('img')).nativeElement.classList;

        fixture.whenStable().then(result => {
            expect(!classes.contains(unselectedClass)).toBeTruthy();
        });
    }));

    it('has unselected class when not selected', async(() => {
        component.selected = 'false';
        fixture.detectChanges();

        let classes = fixture.debugElement.query(By.css('img')).nativeElement.classList;

        fixture.whenStable().then(result => {
            expect(classes.contains(unselectedClass)).toBeTruthy();
        });
    }));
});
