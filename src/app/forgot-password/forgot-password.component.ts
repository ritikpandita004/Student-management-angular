import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgetPassword!: FormGroup;
  constructor(private client: LoginService, private translate: TranslateService, private toastr: ToastrService, private router: Router, private spinner: NgxSpinnerService) {

    this.forgetPassword = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
      ]),
    });
  }

  ngOnInit(): void {

  }

  get loginError() {
    return this.forgetPassword.controls;
  }

  forgotPasswordEmail() {
    if (this.forgetPassword.valid) {

      this.spinner.show()

      this.client.sendEmailVerification(this.forgetPassword.value).then((response)=>{
        this.spinner.hide()
        if (response.success) {
          this.router.navigate(['']);
              this.toastr.success(response.message);

            } else {

              this.toastr.success(response.message);

            }
      }).catch((error)=>{
        this.spinner.hide()
        console.error('Error details:', error);
          this.router.navigate(['']);


          const errorMessage = error?.error?.error;
          this.toastr.success(errorMessage);
      })
    } else {
      console.log('Form is invalid');
    }
  }


  switchLanguage(lang: 'hi' | 'en') {
    this.translate.use(lang);
  }
}

