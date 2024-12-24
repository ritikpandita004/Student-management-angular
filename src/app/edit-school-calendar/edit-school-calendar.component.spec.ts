import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSchoolCalendarComponent } from './edit-school-calendar.component';

describe('EditSchoolCalendarComponent', () => {
  let component: EditSchoolCalendarComponent;
  let fixture: ComponentFixture<EditSchoolCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSchoolCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSchoolCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
