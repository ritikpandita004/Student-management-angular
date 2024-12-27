import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { ToastrService } from 'ngx-toastr';
import { Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.scss']
})
export class AddSchoolComponent implements OnInit {
  mailingAddressDisabled = false;
  districtData: any
  constructor(private client: LoginService, private toastr:ToastrService, private Route:Router, private translate: TranslateService) { }

  ngOnInit(): void {
    this.translate.setDefaultLang('en');


    const savedLanguage = localStorage.getItem('Language');
    if (savedLanguage) {
      this.addSchool.get('language')?.setValue(savedLanguage);
      this.translate.use(savedLanguage);
    }
    this.getDistricts()
  }





  addSchool: FormGroup = new FormGroup(
    {
      schoolImage: new FormControl(''),
      SchoolName: new FormControl('',[Validators.required,Validators.pattern('^[a-z A-Z]+$')]),
      SchoolCode: new FormControl('', [Validators.required,
        Validators.pattern('^[0-9]*$')
     ] ),
      schoolYear: new FormControl('', [Validators.required,
        Validators.pattern('^[0-9]*$')
     ] ),
      OfficeEmail: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?![a-zA-Z0-9._%+-]+@(yopmail\\.com|mailinator\\.com|tempmail\\.com|disposablemail\\.com|trashmail\\.com))^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.com$'
        ),
      ]),
      OfficePhoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern('^[0-9]+$') ]),

      OfficeFaxNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern('^[0-9]+$') ]),

      physical_address: new FormControl('', Validators.required),

      physical_district: new FormControl(),

      physical_city: new FormControl('', [Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),

      ]),
      physical_state: new FormControl('', [Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),

      ]),
      physical_zip: new FormControl('', [Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(6),
        Validators.maxLength(6)
      ]),

      mailing_address: new FormControl('',Validators.required),

      mailing_city: new FormControl('', [Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),

      ]),
      mailing_state: new FormControl('', [Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),

      ]),

      mailing_zip: new FormControl('', [Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(6),
        Validators.maxLength(6)
      ]),

      principal_first_name: new FormControl('', [Validators.required,
        Validators.pattern('^[a-zA-Z]+$')
      ]),

      principal_last_name: new FormControl('', [Validators.required,
        Validators.pattern('^[a-zA-Z]+$')
      ]),

      principal_phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern('^[0-9]+$') ]),

      principal_email: new FormControl('', [Validators.required,   Validators.pattern(
        '^(?![a-zA-Z0-9._%+-]+@(yopmail\\.com|mailinator\\.com|tempmail\\.com|disposablemail\\.com|trashmail\\.com))^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.com$'
      ),]),

      notes: new FormControl(''),

      using_district_calender_district_holiday: new FormControl(''),


    }
  )


  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.addSchool.patchValue({
        schoolImage: file
      });
    }
  }



  getDistricts() {


    this.client.getDistrictView().then((response) => {
      this.districtData = response.data;
    })


  }

  mailingAddressToPhysicalAddress(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    this.mailingAddressDisabled = isChecked;
    if (isChecked) {

      this.addSchool.controls['mailing_address'].setValue(this.addSchool.controls['physical_address'].value
      );
      this.addSchool.controls['mailing_city'].setValue(this.addSchool.controls['physical_city'].value);
      this.addSchool.controls['mailing_state'].setValue(this.addSchool.controls['physical_state'].value);
      this.addSchool.controls['mailing_zip'].setValue(this.addSchool.controls['physical_zip'].value);
    } else {

      this.addSchool.controls['mailing_address'].reset();
      this.addSchool.controls['mailing_city'].reset();
      this.addSchool.controls['mailing_state'].reset();
      this.addSchool.controls['mailing_zip'].reset();
    }
    this.toggleMailingAddressFields(this.mailingAddressDisabled);
  }
  toggleMailingAddressFields(disabled: boolean) {
    if (disabled) {
      this.addSchool.controls['mailing_address'].disable();
      this.addSchool.controls['mailing_city'].disable();
      this.addSchool.controls['mailing_state'].disable();
      this.addSchool.controls['mailing_zip'].disable();
    } else {
      this.addSchool.controls['mailing_address'].enable();
      this.addSchool.controls['mailing_city'].enable();
      this.addSchool.controls['mailing_state'].enable();
      this.addSchool.controls['mailing_zip'].enable();
    }
  }








  submitSchoolData() {
        if (this.mailingAddressDisabled) {

      this.toggleMailingAddressFields(false);
    }

    const formData = new FormData();


    Object.keys(this.addSchool.controls).forEach(key => {
      formData.append(key, this.addSchool.get(key)?.value);
    });


    this.client.addSchool(formData).then((response) => {
      if (response && response.message) {
        this.Route.navigate(['dashboard/schoolInfo'])
        this.toastr.success(response.message);
      } else {
        this.toastr.error(response.message);
      }
      if (this.mailingAddressDisabled) {
        this.toggleMailingAddressFields(true);
      }
    });
  }


  backToSchool(){
    this.Route.navigate(['dashboard/schoolInfo'])
  }
}
