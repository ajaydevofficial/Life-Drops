import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementpageComponent } from './requirementpage.component';

describe('RequirementpageComponent', () => {
  let component: RequirementpageComponent;
  let fixture: ComponentFixture<RequirementpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequirementpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
