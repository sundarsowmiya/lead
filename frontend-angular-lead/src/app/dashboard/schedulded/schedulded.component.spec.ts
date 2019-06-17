import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduldedComponent } from './schedulded.component';

describe('ScheduldedComponent', () => {
  let component: ScheduldedComponent;
  let fixture: ComponentFixture<ScheduldedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduldedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduldedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
