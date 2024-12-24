import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators, AbstractControl } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { passwordValidator } from '../service/password-validator.service';
import { Route, Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resetPassword-page',
  templateUrl: './resetPassword.component.html',
  styleUrls: ['./resetPassword.component.scss']
})

export class ResetPasswordComponent implements OnInit {
  resetpassword!: FormGroup;
  isUppercaseValid: boolean = false;
  isLowercaseValid: boolean = false;
  isNumberValid: boolean = false;
  isSpecialCharValid: boolean = false;
  isValidLength: boolean = false;

  public token: any;

  constructor(
    private client: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private toastr: ToastrService
  ) {
    this.resetpassword = new FormGroup({
      password: new FormControl('', [
        passwordValidator()
      ]),
      confirmPassword: new FormControl('', [
        Validators.required
      ])
    },
      { validators: this.passwordMatchValidator.bind(this) }
    );
  }

  passwordMatchValidator(group: AbstractControl): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  ngOnInit(): void {
    this.translate.setDefaultLang('en');
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.token = params.get('token');
      console.log('Token from paramMap:', this.token);
    });


    this.resetpassword.get('password')?.valueChanges.subscribe(value => {
      this.isUppercaseValid = /[A-Z]/.test(value);
      this.isLowercaseValid = /[a-z]/.test(value);
      this.isNumberValid = /\d/.test(value);
      this.isSpecialCharValid = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      this.isValidLength = value ? value.length >= 8 : false;  // Custom length validation
    });
  }

  resetpasswordForm() {
    if (this.resetpassword.valid) {
      const resetData = {...this.resetpassword.value,

        token: this.token
      };
      console.log('sdvsdv',this.token)
      this.client.sendEmailToken(resetData)
        .then((response: any) => {
          this.toastr.success(response.message);
          this.router.navigate(['']);
        })
        .catch((error: any) => {
          this.toastr.error(error.error.message || 'Password reset failed. Please try again.', 'Error');
        });
    } else {
      console.log('Form is invalid');
    }
  }

  get loginError() {
    return this.resetpassword.controls;
  }

  switchLanguage(lang: 'hi' | 'en') {
    this.translate.use(lang);
  }
}
