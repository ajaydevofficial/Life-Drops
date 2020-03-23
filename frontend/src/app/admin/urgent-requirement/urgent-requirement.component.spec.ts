import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrgentRequirementComponent } from './urgent-requirement.component';

describe('UrgentRequirementComponent', () => {
  let component: UrgentRequirementComponent;
  let fixture: ComponentFixture<UrgentRequirementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrgentRequirementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrgentRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
