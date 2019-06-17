import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRecordingsComponent } from './delete-recordings.component';

describe('DeleteRecordingsComponent', () => {
  let component: DeleteRecordingsComponent;
  let fixture: ComponentFixture<DeleteRecordingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteRecordingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRecordingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
