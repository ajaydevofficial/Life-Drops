import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaterequirementpageComponent } from './createrequirementpage.component';

describe('CreaterequirementpageComponent', () => {
  let component: CreaterequirementpageComponent;
  let fixture: ComponentFixture<CreaterequirementpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreaterequirementpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreaterequirementpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
