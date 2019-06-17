import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteScheduldedComponent } from './delete-schedulded.component';

describe('DeleteScheduldedComponent', () => {
  let component: DeleteScheduldedComponent;
  let fixture: ComponentFixture<DeleteScheduldedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteScheduldedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteScheduldedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
