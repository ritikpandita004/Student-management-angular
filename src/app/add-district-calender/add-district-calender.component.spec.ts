import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDistrictCalenderComponent } from './add-district-calender.component';

describe('AddDistrictCalenderComponent', () => {
  let component: AddDistrictCalenderComponent;
  let fixture: ComponentFixture<AddDistrictCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDistrictCalenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDistrictCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
