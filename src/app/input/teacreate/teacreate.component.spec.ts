import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TeacreateComponent } from './teacreate.component';

import { EnumValuesPipe } from '../../enum-values.pipe';

describe('TeacreateComponent', () => {
    let component: TeacreateComponent;
    let fixture: ComponentFixture<TeacreateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule ],
            declarations: [
                TeacreateComponent,
                EnumValuesPipe,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TeacreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
