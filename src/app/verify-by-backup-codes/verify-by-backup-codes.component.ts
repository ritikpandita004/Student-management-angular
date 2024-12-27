import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify-by-backup-codes',
  templateUrl: './verify-by-backup-codes.component.html',
  styleUrls: ['./verify-by-backup-codes.component.scss']
})
export class VerifyByBackupCodesComponent implements OnInit {
  backupCode: string = ''; // The backup code entered by the user
  userId: string = ''; // User ID from URL
  google2fa_secret: string = ''; // Google 2FA secret
  backupCodes: string[] = []; // Array to hold the user's backup codes

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Retrieve the userId from the route parameters
    this.userId = this.route.snapshot.paramMap.get('id') || '';

    // You can fetch google2fa_secret from a service or sessionStorage
    this.google2fa_secret = sessionStorage.getItem('google2fa_secret') || ''; // Example: from sessionStorage
  }

  // Verify the entered backup code using Promise and .then()
  verifyBackupCode() {
    if (!this.backupCode) {
      alert('Please enter a backup code');
      return;
    }

  

    this.loginService.verifyBackupCodes(this.userId, this.backupCode, this.google2fa_secret)
      .then(response => {
        if (response.success) {
          const token = response.jwt_token;
          const user_id = response.user_id;

          if (token) {
            sessionStorage.setItem('jwtToken', token);
            sessionStorage.setItem('user_id', user_id);
          }

          this.toastr.success(response.message);
          this.router.navigate(['/dashboard']);
        } else {
          this.toastr.error(response.message || 'Invalid backup code');
        }
      })
      .catch((error: HttpErrorResponse) => {
        const errorMessage = error.error?.message || 'An unexpected error occurred.';
        this.toastr.error(errorMessage);
        console.error('Error during backup code verification', error);
      });
  }

  onLogout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
