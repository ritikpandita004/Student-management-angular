import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent implements OnInit {

  constructor(private Route: Router, private client: LoginService, private tostr:ToastrService, private spinner: NgxSpinnerService) { }
  District: any;
  schoolinfo: any;
  ngOnInit(): void {
    this.schoolDistrict()

  }

  addTeachers: FormGroup = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    school_district: new FormControl(''),
    school_name: new FormControl(''),
    grade: new FormControl(''),
    room_number: new FormControl(''),
    default_room_number: new FormControl(''),
    work_phone: new FormControl(''),
    position: new FormControl(''),
    staff_id: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    zip: new FormControl(''),
    new_student_in_classroom: new FormControl(''),
    disable_student_account: new FormControl(''),
    update_student_rfid: new FormControl(''),





  })

  cancelbtn() {
    this.Route.navigate(['dashboard/teacher'])
  }



  schoolDistrict() {
    this.client.getSchoolDistrict().then((response) => {
      if (response) {
        this.District = response.data

      }
    })
  }




  school(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value; // Cast to t
    this.client.getSchoolName(selectedId).then((response) => {
      if (response) {
        this.schoolinfo = response.data;
      }
    });
  }

  saveTeachers() {
    this.spinner.show();
    this.client.saveTeacher(this.addTeachers.value)
      .then((response) => {
        this.spinner.hide();  

        if (response.success) {
          this.tostr.success(response.message);
          this.Route.navigate(['dashboard/teacher']);
        } else {
          this.tostr.error(response.message);
        }
      })
      .catch((error) => {
        // Handle any error that occurs during the API call
        this.spinner.hide();  // Hide the spinner in case of an error
        console.error('Error:', error);
        this.tostr.error('An unexpected error occurred. Please try again.');
      });
  }

}
