import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { passwordValidator } from '../service/password-validator.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isUppercaseValid: boolean = false;
  isLowercaseValid: boolean = false;
  isNumberValid: boolean = false;
  isSpecialCharValid: boolean = false;
  isValidLength: boolean = false;  // Custom length validation
  hide = true;

  constructor(
    private client: LoginService,
    private router: Router,
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
      ]),
      password: new FormControl('', [
        Validators.required,
        passwordValidator()
      ])
    });
  }

  ngOnInit(): void {
    this.translate.setDefaultLang('en');

    // Custom validation for password changes
    this.loginForm.get('password')?.valueChanges.subscribe(value => {
      this.isUppercaseValid = /[A-Z]/.test(value);
      this.isLowercaseValid = /[a-z]/.test(value);
      this.isNumberValid = /\d/.test(value);
      this.isSpecialCharValid = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      this.isValidLength = value ? value.length >= 8 : false;
    });
  }

  toggleVisibility(isVisible: boolean): void {
    this.hide = !isVisible;
  }
  loginData(): void {
    if (this.loginForm.valid && this.isValidLength) {
      this.spinner.show();
      this.client.submitLoginDetails(this.loginForm)
        .then((response) => {
          this.spinner.hide();
          if (!response.QR_Image && !response.secret) {
            const user_id = response.user_id;
            this.router.navigate(['/user-verification-check', user_id]);
          }
          else {
            const QR_Image = response.QR_Image;
            const secret = response.secret;
            const user_id = response.user_id;
            this.router.navigate(['/2fa-verification'], {
              queryParams: { QR_Image, secret, user_id }
            });
          }

        })
        .catch((error) => {
          this.spinner.hide();
          const errorMessage = error?.error?.message || 'An unknown error occurred during login';
          this.toastr.error(errorMessage);
          console.error('An error occurred during login:', error);
        });
    } else {
      this.spinner.hide();
      console.log('Form is invalid');
    }
  }


  get loginError() {
    return this.loginForm.controls;
  }

  fogotPassword() {
    this.router.navigate(['/forgotPassword']);
  }

  switchLanguage(lang: 'hi' | 'en') {
    localStorage.setItem('Language', lang);
    this.client.setLanguage(lang);
    this.translate.use(lang);
  }
}
