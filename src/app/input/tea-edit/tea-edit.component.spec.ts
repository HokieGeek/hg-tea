import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TeaEditComponent } from './tea-edit.component';

import { TestUtils } from '../../test-utils';

describe('TeaEditComponent', () => {
    let component: TeaEditComponent;
    let fixture: ComponentFixture<TeaEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
            ],
            declarations: [ TeaEditComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TeaEditComponent);
        component = fixture.componentInstance;

        component.tea = TestUtils.createDummyTea();

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
