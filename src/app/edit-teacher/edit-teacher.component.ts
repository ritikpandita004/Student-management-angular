import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.scss']
})
export class EditTeacherComponent implements OnInit {
  District: any;
  schoolinfo: any;
  teacherId:any;
  teacherDetails:any;
  constructor(private Route:Router, private client:LoginService, private route:ActivatedRoute, private tostr:ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      this.teacherId = id || "";

    });
    this.getTeacherEditview()
    this.schoolDistrict()

  }


  editTeachers: FormGroup = new FormGroup({
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



  getTeacherEditview() {
    this.client.getTeacherDetailsById(this.teacherId).then((response) => {
      const teacherDetails = response.data.teacherDetails[0];
      const userDetails = response.data.userDetails[0];

      if (teacherDetails && userDetails) {
        this.editTeachers.patchValue({
          first_name: teacherDetails.first_name || '',
          last_name: teacherDetails.last_name || '',
          email: userDetails.email || '',
          phone: teacherDetails.phone || '',
          grade: teacherDetails.grade || '',
          room_number: teacherDetails.room_number || '',
          default_room_number: teacherDetails.default_room_number || '',
          work_phone: teacherDetails.work_phone || '',
          position: teacherDetails.position || '',
          staff_id: teacherDetails.staff_id || '',
          address: teacherDetails.address || userDetails.address || '',
          city: userDetails.City || '',
          state: userDetails.State || '',
          zip: userDetails.Zipcode || '',
          new_student_in_classroom: teacherDetails.new_student_in_classroom || '',
          disable_student_account: teacherDetails.disable_student_account || '',
          update_student_rfid: teacherDetails.update_student_rfid || '',
        });


      }
    });
  }

  saveTeachers() {
    this.spinner.show();
    this.client.saveTeacher(this.editTeachers.value).then((response)=>{
      if(response.success==true){
        this.spinner.hide();
        this.Route.navigate(['dashboard/teacher']);
        this.tostr.success(response.message)
      }

      else{
        this.spinner.hide();
        this.tostr.error(response.message)
      }

    })
  }


  cancelbtn() {
    this.Route.navigate(['dashboard/teacher'])
  }

}
