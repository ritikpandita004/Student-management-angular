import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVerificationCheckComponent } from './user-verification-check.component';

describe('UserVerificationCheckComponent', () => {
  let component: UserVerificationCheckComponent;
  let fixture: ComponentFixture<UserVerificationCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserVerificationCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserVerificationCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
