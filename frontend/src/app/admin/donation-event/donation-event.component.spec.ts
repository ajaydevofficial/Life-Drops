import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationEventComponent } from './donation-event.component';

describe('DonationEventComponent', () => {
  let component: DonationEventComponent;
  let fixture: ComponentFixture<DonationEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonationEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
