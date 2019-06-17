import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnqualifiedComponent } from './unqualified.component';

describe('UnqualifiedComponent', () => {
  let component: UnqualifiedComponent;
  let fixture: ComponentFixture<UnqualifiedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnqualifiedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnqualifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
