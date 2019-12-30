import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrgentrequirementpageComponent } from './urgentrequirementpage.component';

describe('UrgentrequirementpageComponent', () => {
  let component: UrgentrequirementpageComponent;
  let fixture: ComponentFixture<UrgentrequirementpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrgentrequirementpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrgentrequirementpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
