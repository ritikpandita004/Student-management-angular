import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

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

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private tostr:ToastrService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    this.google2fa_secret = this.route.snapshot.queryParamMap.get('secret') || '';

  }

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

        this.tostr.success(response.message);
        this.router.navigate(['/dashboard']);
      } else {
        this.tostr.error(response.message || 'Invalid OTP token');
      }
    } catch (error) {

      if (error instanceof HttpErrorResponse) {
        const errorMessage = error.error?.message || 'An unexpected error occurred.';
        this.tostr.error(errorMessage);
      } else {
        this.tostr.error('An unexpected error occurred.');
      }
      console.error('Error during OTP request', error);
    }
  }


  onLogout(){
    sessionStorage.clear();
    this.router.navigate([''])
  }

}
