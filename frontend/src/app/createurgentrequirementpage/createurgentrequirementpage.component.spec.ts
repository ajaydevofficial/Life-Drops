import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateurgentrequirementpageComponent } from './createurgentrequirementpage.component';

describe('CreateurgentrequirementpageComponent', () => {
  let component: CreateurgentrequirementpageComponent;
  let fixture: ComponentFixture<CreateurgentrequirementpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateurgentrequirementpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateurgentrequirementpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
