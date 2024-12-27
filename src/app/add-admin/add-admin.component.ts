import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


interface District {
  id: number;
  district_name: string;
  physical_state: string;
  physical_city: string;
}

interface School {
  id: number;
  school_name: string;
  physical_state: string;
  physical_city: string;
  district_id: number;
}

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {
  districtsInfo: District[] = [];
  schoolData: School[] = [];
  selectedDistricts: number[] = [];
  selectedSchools: number[] = [];
  submitAdminDetails: FormGroup = new FormGroup({
    first_name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z]+$')
    ]),
    last_name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z]+$')
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?![a-zA-Z0-9._%+-]+@(yopmail\\.com|mailinator\\.com|tempmail\\.com|disposablemail\\.com|trashmail\\.com))^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.com$'
      ),
    ]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern('^[0-9]+$') ]),
    address: new FormControl('', Validators.required),
    city: new FormControl('', [Validators.required,
      Validators.pattern('^[a-zA-Z]+$'),

    ]),
    state: new FormControl('', [Validators.required,
      Validators.pattern('^[a-zA-Z]+$'),

    ]),
    zip: new FormControl('', [Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(6),
      Validators.maxLength(6)
    ]),
    district_access: new FormControl([]),
    school_access: new FormControl([]),
    edit_district: new FormControl('no'),
    district_calendar: new FormControl('no'),
    school_calendar: new FormControl('no'),
    teachers: new FormControl('no'),
    students: new FormControl('no'),
    school_info: new FormControl('no'),
    notes: new FormControl('')

  });

  constructor(private client: LoginService, private toastr: ToastrService ,private Route:Router, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.getDistrictsInfo();
  }

  adminDetails() {

    const formData = {
      ...this.submitAdminDetails.value,

      district_access: this.selectedDistricts,

      school_access: this.selectedSchools,
    };

    this.spinner.show()
    this.client.adminDetilsSubmit(formData).then((response) => {
      this.spinner.hide()
      if (response.success === true) {

        this.toastr.success('Admin details submitted successfully');

        this.Route.navigate(['dashboard/admin']);
      } else if (response.success === false) {
        this.toastr.error(response.message);
      }
    }).catch((error) => {
      this.toastr.error('An error occurred while submitting admin details.');
    });

  }


  getDistrictsInfo() {
    this.client.getDistrictsForAdmin().then((response: { data: District[] }) => {
      this.districtsInfo = response.data;
    }).catch(() => {
      this.toastr.error('Failed to fetch districts');
    });
  }

  onDistrictChange(event: any, districtId: number) {
    if (event.target.checked) {
      this.selectedDistricts.push(districtId);
    } else {
      const index = this.selectedDistricts.indexOf(districtId);
      if (index !== -1) {
        this.selectedDistricts.splice(index, 1);
      }
    }

    this.getSchoolsForSelectedDistricts();
  }

  onSchoolChange(event: any, schoolId: number) {
    if (event.target.checked) {
      this.selectedSchools.push(schoolId);
    } else {
      const index = this.selectedSchools.indexOf(schoolId);
      if (index !== -1) {
        this.selectedSchools.splice(index, 1);
      }
    }
  }
  getSchoolsForSelectedDistricts() {
    if (this.selectedDistricts.length === 0) {
      this.schoolData = [];
      return;
    }

    this.client.getSchoolsByDistricts(this.selectedDistricts).then((response: { success: boolean, data: School[], message: string }) => {
      if (response.success) {
        this.schoolData = response.data;
      } else {
        this.toastr.error(response.message);
      }
    }).catch(() => {
      this.toastr.error('Failed to fetch schools');
    });
  }

  cancelBtn(){
    this.Route.navigate(['dashboard/admin']);
  }
}
