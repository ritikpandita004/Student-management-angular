import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyByBackupCodesComponent } from './verify-by-backup-codes.component';

describe('VerifyByBackupCodesComponent', () => {
  let component: VerifyByBackupCodesComponent;
  let fixture: ComponentFixture<VerifyByBackupCodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyByBackupCodesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyByBackupCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
