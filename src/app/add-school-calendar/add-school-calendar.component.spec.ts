import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSchoolCalendarComponent } from './add-school-calendar.component';

describe('AddSchoolCalendarComponent', () => {
  let component: AddSchoolCalendarComponent;
  let fixture: ComponentFixture<AddSchoolCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSchoolCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSchoolCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
