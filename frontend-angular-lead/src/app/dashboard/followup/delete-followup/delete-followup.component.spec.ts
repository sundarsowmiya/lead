import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFollowupComponent } from './delete-followup.component';

describe('DeleteFollowupComponent', () => {
  let component: DeleteFollowupComponent;
  let fixture: ComponentFixture<DeleteFollowupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteFollowupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFollowupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
