import { TestBed } from '@angular/core/testing';

import { AuthGuardForNoTokenGuard } from './auth-guard-for-no-token.guard';

describe('AuthGuardForNoTokenGuard', () => {
  let guard: AuthGuardForNoTokenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuardForNoTokenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
