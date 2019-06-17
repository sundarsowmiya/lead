import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecordingsComponent } from './edit-recordings.component';

describe('EditRecordingsComponent', () => {
  let component: EditRecordingsComponent;
  let fixture: ComponentFixture<EditRecordingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRecordingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRecordingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
