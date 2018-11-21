import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { AutofillerComponent } from './autofiller.component';

describe('AutofillerComponent', () => {
    let component: AutofillerComponent;
    let fixture: ComponentFixture<AutofillerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NgbTypeaheadModule,
                FormsModule,
            ],
            declarations: [
                AutofillerComponent,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AutofillerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
