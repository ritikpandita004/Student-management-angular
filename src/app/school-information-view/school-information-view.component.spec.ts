import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolInformationViewComponent } from './school-information-view.component';

describe('SchoolInformationViewComponent', () => {
  let component: SchoolInformationViewComponent;
  let fixture: ComponentFixture<SchoolInformationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolInformationViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolInformationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
