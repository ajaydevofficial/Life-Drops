import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationpageComponent } from './notificationpage.component';

describe('NotificationpageComponent', () => {
  let component: NotificationpageComponent;
  let fixture: ComponentFixture<NotificationpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
