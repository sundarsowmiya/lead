import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUnqualifiedComponent } from './add-unqualified.component';

describe('AddUnqualifiedComponent', () => {
  let component: AddUnqualifiedComponent;
  let fixture: ComponentFixture<AddUnqualifiedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUnqualifiedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUnqualifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
