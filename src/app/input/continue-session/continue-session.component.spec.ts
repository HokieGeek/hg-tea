import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinueSessionComponent } from './continue-session.component';

describe('ContinueSessionComponent', () => {
  let component: ContinueSessionComponent;
  let fixture: ComponentFixture<ContinueSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContinueSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContinueSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
