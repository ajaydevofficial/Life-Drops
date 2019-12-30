import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedonationeventpageComponent } from './createdonationeventpage.component';

describe('CreatedonationeventpageComponent', () => {
  let component: CreatedonationeventpageComponent;
  let fixture: ComponentFixture<CreatedonationeventpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedonationeventpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedonationeventpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
