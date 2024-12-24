import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


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
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.scss']
})


export class EditAdminComponent implements OnInit {
  adminId: any;
  districtsInfo: District[] = [];
  adminDetails: any
  selectedDistricts: number[] = [];
  schoolData: School[] = [];
  selectedSchools: number[] = [];
  constructor(private Route: Router, private client: LoginService, private route: ActivatedRoute, private tostr: ToastrService) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      this.adminId = id || "";

    });
  }

  ngOnInit(): void {
    this.getEditAdminView()

  }


  editAdminDetails: FormGroup = new FormGroup({
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
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
    ]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]),
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
  cancelBtn() {
    this.Route.navigate(['dashboard/admin']);
  }


  getEditAdminView() {
    this.client.getAdminEditDetails(this.adminId).then((response) => {
      if (response.success == true) {
        this.adminDetails = response.data
        console.log(this.adminDetails)
        this.editAdminDetails.patchValue({
          first_name: this.adminDetails.userDetails.name,
          last_name: this.adminDetails.userDetails.last_name,
          email: this.adminDetails.userDetails.email,
          phone: this.adminDetails.userDetails.phone,
          address: this.adminDetails.userDetails.address,
          city: this.adminDetails.userDetails.City,
          state: this.adminDetails.userDetails.State,
          zip: this.adminDetails.userDetails.Zipcode,

          district_access: this.adminDetails.districts,
          school_access: this.adminDetails.schools,


          edit_district: this.adminDetails.adminDetails.edit_District_Information,
          district_calendar: this.adminDetails.adminDetails.add_edit_District_Calendar_Years,
          school_calendar: this.adminDetails.adminDetails.add_edit_School_Calendar_Years,
          teachers: this.adminDetails.adminDetails.add_edit_Teachers,
          students: this.adminDetails.adminDetails.add_edit_Students,
          school_info: this.adminDetails.adminDetails.add_edit_School_Information,
          notes: this.adminDetails.adminDetails.notes,

        })


      }
      else {
        this.tostr.error("something went wrong")
      }
    })
  }


  editDetails() {

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
        this.tostr.error(response.message);
      }
    }).catch(() => {
      this.tostr.error('Failed to fetch schools');
    });
  }


}
