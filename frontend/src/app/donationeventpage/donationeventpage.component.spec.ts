import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationeventpageComponent } from './donationeventpage.component';

describe('DonationeventpageComponent', () => {
  let component: DonationeventpageComponent;
  let fixture: ComponentFixture<DonationeventpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonationeventpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationeventpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
