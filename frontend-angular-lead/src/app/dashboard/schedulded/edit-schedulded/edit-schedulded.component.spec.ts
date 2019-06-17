import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditScheduldedComponent } from './edit-schedulded.component';

describe('EditScheduldedComponent', () => {
  let component: EditScheduldedComponent;
  let fixture: ComponentFixture<EditScheduldedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditScheduldedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditScheduldedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
