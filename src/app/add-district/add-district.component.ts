import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-district',
  templateUrl: './add-district.component.html',
  styleUrls: ['./add-district.component.scss']
})
export class AddDistrictComponent implements OnInit {
  isActive = false;
  mailingAddressDisabled = false;

  constructor(private client: LoginService, private translate: TranslateService, private toastr: ToastrService,private Route:Router) { }

  ngOnInit(): void {
    this.translate.setDefaultLang('en');


    const savedLanguage = localStorage.getItem('Language');
    if (savedLanguage) {
      this.districtForm.get('language')?.setValue(savedLanguage);
      this.translate.use(savedLanguage);
    }
  }
  districtForm: FormGroup = new FormGroup({
    districtCode: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    districtName: new FormControl('',[Validators.required,
      Validators.pattern('^[a-zA-Z]+$')


    ] ),

    schoolYear: new FormControl('', [Validators.required,
      Validators.pattern('^[0-9]*$')
   ] ),
    officeEmail: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?![a-zA-Z0-9._%+-]+@(yopmail\\.com|mailinator\\.com|tempmail\\.com|disposablemail\\.com|trashmail\\.com))^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.com$'
      ),
    ]),
    officePhoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern('^[0-9]+$') ]),

    officeFaxNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern('^[0-9]+$') ]),

    physical_address: new FormControl('', Validators.required),

    physical_city: new FormControl('', [Validators.required,
      Validators.pattern('^[a-zA-Z]+$'),

    ]),

    physical_state: new FormControl('', [Validators.required,
      Validators.pattern('^[a-zA-Z]+$')
    ]),
    physical_zip: new FormControl('', [Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(6),
      Validators.maxLength(6)
    ]),
    mailing_address: new FormControl('', Validators.required),

    mailing_city: new FormControl('', [Validators.required,
      Validators.pattern('^[a-zA-Z]+$')
    ]),
    mailing_state: new FormControl('', [Validators.required,
      Validators.pattern('^[a-zA-Z]+$')
    ]),
    mailing_zip: new FormControl('', [Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    superintendent_first_name: new FormControl('', [Validators.required,
      Validators.pattern('^[a-zA-Z]+$')
    ]),
    superintendent_last_name: new FormControl('', [Validators.required,
      Validators.pattern('^[a-zA-Z]+$')
    ]),
    superintendent_phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern('^[0-9]+$') ]),

    superintendent_email: new FormControl('', [Validators.required,    Validators.pattern(
      '^(?![a-zA-Z0-9._%+-]+@(yopmail\\.com|mailinator\\.com|tempmail\\.com|disposablemail\\.com|trashmail\\.com))^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.com$'
    ),]),


    notes: new FormControl('')

  })


  mailingAddressToPhysicalAddress(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    this.mailingAddressDisabled = isChecked;
    if (isChecked) {

      this.districtForm.controls['mailing_address'].setValue(this.districtForm.controls['physical_address'].value
      );
      this.districtForm.controls['mailing_city'].setValue(this.districtForm.controls['physical_city'].value);
      this.districtForm.controls['mailing_state'].setValue(this.districtForm.controls['physical_state'].value);
      this.districtForm.controls['mailing_zip'].setValue(this.districtForm.controls['physical_zip'].value);
    } else {

      this.districtForm.controls['mailing_address'].reset();
      this.districtForm.controls['mailing_city'].reset();
      this.districtForm.controls['mailing_state'].reset();
      this.districtForm.controls['mailing_zip'].reset();
    }
    this.toggleMailingAddressFields(this.mailingAddressDisabled);
  }
  toggleMailingAddressFields(disabled: boolean) {
    if (disabled) {
      this.districtForm.controls['mailing_address'].disable();
      this.districtForm.controls['mailing_city'].disable();
      this.districtForm.controls['mailing_state'].disable();
      this.districtForm.controls['mailing_zip'].disable();
    } else {
      this.districtForm.controls['mailing_address'].enable();
      this.districtForm.controls['mailing_city'].enable();
      this.districtForm.controls['mailing_state'].enable();
      this.districtForm.controls['mailing_zip'].enable();
    }
  }


  saveDistrictInfo() {
    if (this.mailingAddressDisabled) {

      this.toggleMailingAddressFields(false);
    }

    this.client.submitDistrictInformation(this.districtForm.value).then((response) => {
      const responseData = response as { message: string };

      if (responseData && responseData.message) {
        this.toastr.success(responseData.message);
        this.Route.navigate(['dashboard/district'])
      } else {
        this.toastr.error('Unexpected response format');
      }


      if (this.mailingAddressDisabled) {
        this.toggleMailingAddressFields(true);
      }
    }).catch((error) => {
      this.toastr.error('Error submitting district information');
      console.error(error);


      if (this.mailingAddressDisabled) {
        this.toggleMailingAddressFields(true);
      }
    });
  }

  cancelbtn(){
    this.Route.navigate(['dashboard/district'])
  }



  toggleActive() {
    this.isActive = !this.isActive;
  }

}
