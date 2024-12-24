import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolCalendarInformationComponent } from './school-calendar-information.component';

describe('SchoolCalendarInformationComponent', () => {
  let component: SchoolCalendarInformationComponent;
  let fixture: ComponentFixture<SchoolCalendarInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolCalendarInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolCalendarInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
