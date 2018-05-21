import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortFieldComponent } from './sort-field.component';

describe('SortFieldComponent', () => {
  let component: SortFieldComponent;
  let fixture: ComponentFixture<SortFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
