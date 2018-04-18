import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacupimgComponent } from './teacupimg.component';

describe('TeacupimgComponent', () => {
  let component: TeacupimgComponent;
  let fixture: ComponentFixture<TeacupimgComponent>;

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
});
