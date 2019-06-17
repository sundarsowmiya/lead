import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScheduldedComponent } from './add-schedulded.component';

describe('AddScheduldedComponent', () => {
  let component: AddScheduldedComponent;
  let fixture: ComponentFixture<AddScheduldedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddScheduldedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScheduldedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
