import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictCalenderComponent } from './district-calender.component';

describe('DistrictCalenderComponent', () => {
  let component: DistrictCalenderComponent;
  let fixture: ComponentFixture<DistrictCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictCalenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistrictCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
