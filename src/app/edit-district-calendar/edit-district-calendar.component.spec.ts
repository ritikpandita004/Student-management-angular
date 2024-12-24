import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDistrictCalendarComponent } from './edit-district-calendar.component';

describe('EditDistrictCalendarComponent', () => {
  let component: EditDistrictCalendarComponent;
  let fixture: ComponentFixture<EditDistrictCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDistrictCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDistrictCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
