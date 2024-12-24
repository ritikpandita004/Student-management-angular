import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Route } from '@angular/router';

@Component({
  selector: 'app-edit-district',
  templateUrl: './edit-district.component.html',
  styleUrls: ['./edit-district.component.scss']
})
export class EditDistrictComponent implements OnInit {
  District: any;

  districtId: string = '';






  constructor(private client: LoginService, private toastr: ToastrService, private route: ActivatedRoute,
    private router: Router) {

    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      this.districtId = id || "";

    });

  }


  ngOnInit(): void {
    this.editDistrictView()

  }


  districtEditForm: FormGroup = new FormGroup({
    districtCode: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    districtName: new FormControl('', [Validators.required,
    Validators.pattern('^[a-zA-Z]+$')


    ]),

    schoolYear: new FormControl('', [Validators.required,
    Validators.pattern('^[0-9]*$')
    ]),
    officeEmail: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?![a-zA-Z0-9._%+-]+@(yopmail\\.com|mailinator\\.com|tempmail\\.com|disposablemail\\.com|trashmail\\.com))^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.com$'
      ),
    ]),
    officePhoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]),

    officeFaxNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]),

    physical_address: new FormControl('', Validators.required),
    physical_city: new FormControl('', [Validators.required,
    Validators.pattern('^[a-zA-Z]+$')
    ]),
    physical_state: new FormControl('', [Validators.required,
    Validators.pattern('^[a-zA-Z]+$')
    ]),
    physical_zip: new FormControl('', [Validators.required,
    Validators.pattern('^[0-9]*$')
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
    superintendent_phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]),
    superintendent_email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),


    notes: new FormControl('')


  })


  editDistrictInfo() {

    const editDistricts = this.districtEditForm.value;
    this.client.UpdateDistrictInfo(editDistricts, this.districtId).then()

      .then((response: any) => {
        if (response && response.success) {
          this.toastr.success(response.message);
          this.router.navigate(['dashboard/district'])
        } else {
          console.error('Failed to update profile:', response.message);
        }
      })
      .catch(err => {
        console.error('Error updating profile:', err);
      });
  }




  editDistrictView() {


    this.client.getDistrictInfo(this.districtId)

      .then((response: any) => {

        if (response && response.success) {
          this.District = response.showDistricts,

            console.log('API response:', this.District);

          this.districtEditForm.patchValue({
            districtCode: this.District.district_Code,
            districtName: this.District.district_name,
            schoolYear: this.District.school_year,
            officeEmail: this.District.office_email,
            officePhoneNumber: this.District.office_phone_number,
            officeFaxNumber: this.District.office_fax_number,
            physical_address: this.District.physical_address,
            physical_city: this.District.physical_city,
            physical_state: this.District.physical_state,
            physical_zip: this.District.physical_zip,
            mailing_address: this.District.mailing_address,
            mailing_city: this.District.mailing_city,
            mailing_state: this.District.mailing_state,
            mailing_zip: this.District.mailing_zip,
            superintendent_first_name: this.District.superintendent_first_name,
            superintendent_last_name: this.District.superintendent_last_name,
            superintendent_phoneNumber: this.District.superintendent_phone_number,
            superintendent_email: this.District.superintendent_email,
            notes: this.District.notes

          });
        }
      })

  }
  cancelbtn() {
    this.router.navigate(['dashboard/district'])
  }

}
