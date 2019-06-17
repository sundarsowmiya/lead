import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecordingsComponent } from './add-recordings.component';

describe('AddRecordingsComponent', () => {
  let component: AddRecordingsComponent;
  let fixture: ComponentFixture<AddRecordingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRecordingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRecordingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
