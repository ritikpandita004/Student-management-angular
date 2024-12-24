import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-verification',
  templateUrl: './user-verification.component.html',
  styleUrls: ['./user-verification.component.scss']
})
export class UserVerificationComponent implements OnInit {
  QR_Image: string = '';
  secret: string = '';
  user_id: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.QR_Image= params['QR_Image'];
      this.secret = params['secret'];
      this.user_id = params['user_id'];

    });
  }

  proceedToOtpVerification(): void {
    if (this.user_id && this.secret) {
      this.router.navigate(['user-verification-check', this.user_id], {
        queryParams: { secret: this.secret }
      });
    } else {
      alert('User ID or secret is not available. Unable to proceed with OTP verification.');
    }
  }


}
