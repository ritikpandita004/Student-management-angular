import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolClassroomInformationComponent } from './school-classroom-information.component';

describe('SchoolClassroomInformationComponent', () => {
  let component: SchoolClassroomInformationComponent;
  let fixture: ComponentFixture<SchoolClassroomInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolClassroomInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolClassroomInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
