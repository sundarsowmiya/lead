import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUnqualifiedComponent } from './delete-unqualified.component';

describe('DeleteUnqualifiedComponent', () => {
  let component: DeleteUnqualifiedComponent;
  let fixture: ComponentFixture<DeleteUnqualifiedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteUnqualifiedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUnqualifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
