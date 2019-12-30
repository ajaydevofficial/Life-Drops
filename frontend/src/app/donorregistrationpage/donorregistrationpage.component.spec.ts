import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorregistrationpageComponent } from './donorregistrationpage.component';

describe('DonorregistrationpageComponent', () => {
  let component: DonorregistrationpageComponent;
  let fixture: ComponentFixture<DonorregistrationpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonorregistrationpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorregistrationpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
