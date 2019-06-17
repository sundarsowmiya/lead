import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUnqualifiedComponent } from './edit-unqualified.component';

describe('EditUnqualifiedComponent', () => {
  let component: EditUnqualifiedComponent;
  let fixture: ComponentFixture<EditUnqualifiedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUnqualifiedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUnqualifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
