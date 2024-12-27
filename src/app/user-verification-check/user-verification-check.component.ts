import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { jsPDF } from 'jspdf'; // Correct import for jsPDF

@Component({
  selector: 'app-user-verification-check',
  templateUrl: './user-verification-check.component.html',
  styleUrls: ['./user-verification-check.component.scss']
})
export class UserVerificationCheckComponent implements OnInit {
  otp: string = '';
  userId: string = '';
  email: string = '';
  google2fa_secret: string = '';
  backupCodes: string[] = [];

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    this.google2fa_secret = this.route.snapshot.queryParamMap.get('secret') || '';
  }

  // Generate and download PDF with backup codes
// Generate and download PDF with backup codes
downloadBackupCodesPDF(backupCodes: string[]): void {
  if (!backupCodes || backupCodes.length === 0) {
   
    return;
  }

  const doc = new jsPDF(); // Create a new instance of jsPDF
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(16);
  doc.text('Your Backup Codes', 10, 10);

  backupCodes.forEach((code, index) => {
    doc.text(`${index + 1}. ${code}`, 10, 20 + index * 10);
  });

  // Save the PDF
  doc.save('backup-codes.pdf');
}

// Redirect to the backup code page after generating the PDF
redirectToBackupCodePage(id: string): void {
  if (!id) {
    this.toastr.error('Invalid user ID for navigation.');
    return;
  }

  // Fetch backup codes from the server
  this.loginService.getBackupCodes(id).subscribe({
    next: (response) => {
      if (response.success) {
        this.backupCodes = response.backup_codes;

        // Check if backup codes are already present and skip PDF generation
        if (response.message === 'Backup codes already present.') {
          // If backup codes already exist, just navigate without generating PDF
          this.router.navigate(['/back-code-page', id]);
        } else {
          // If no backup codes are present, generate and download PDF
          this.downloadBackupCodesPDF(this.backupCodes);
          this.router.navigate(['/back-code-page', id]);
        }
      } else {
        // Display error if there's another message
        this.toastr.error('Failed to retrieve backup codes.');
      }
    },
    error: (error: HttpErrorResponse) => {
      const errorMessage = error.error?.message || 'An unexpected error occurred.';
      this.toastr.error(errorMessage);
    }
  });
}

  // Login user with OTP
  async loginUser() {
    if (!this.otp) {
      alert('Please enter OTP');
      return;
    }

    try {
      const response = await this.loginService.verifyOtp(
        this.otp,
        this.userId,
        this.google2fa_secret
      );

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
        this.toastr.error(response.message || 'Invalid OTP token');
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        const errorMessage = error.error?.message || 'An unexpected error occurred.';
        this.toastr.error(errorMessage);
      } else {
        this.toastr.error('An unexpected error occurred.');
      }
      console.error('Error during OTP request', error);
    }
  }
}
