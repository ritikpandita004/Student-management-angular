import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {
  studentId: any;
  StudentData: any;
  constructor(private Route: Router, private client: LoginService, private Routes: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.Routes.paramMap.subscribe((params: ParamMap) => {
      let id = params.get("id");
      this.studentId = id;
      this.getStudentDetailByID();
    });
  }
  students: FormGroup = new FormGroup({

    rfidTagNumber: new FormControl('', Validators.required),
    studentFirstName: new FormControl('', Validators.required),
    studentLastName: new FormControl('', Validators.required),
    studentEmail: new FormControl('', [Validators.required, Validators.email]),
    studentIdNumber: new FormControl('', Validators.required),
    guardianFirstName: new FormControl('', Validators.required),
    guardianLastName: new FormControl('', Validators.required),
    guardianEmail: new FormControl('', [Validators.required, Validators.email]),
    guardianPhoneNumber: new FormControl('', Validators.required),
    mailingAddress: new FormControl('', Validators.required),
    mailingCity: new FormControl('', Validators.required),
    mailingState: new FormControl('', Validators.required),
    mailingZip: new FormControl('', Validators.required),
    schoolDistrict: new FormControl('', Validators.required),
    schoolName: new FormControl('', Validators.required),
    teacherName: new FormControl('', Validators.required),
    grade: new FormControl('', Validators.required),
    roomNumber: new FormControl('', Validators.required),
    notes: new FormControl(''),
  });

  cancelbtn() {
    this.Route.navigate(['dashboard/student']);
  }

  getStudentDetailByID() {
    this.client.getstudentById(this.studentId).then((response) => {
      if (response.success === true) {
        this.StudentData = response.data;
        this.students.patchValue({
          rfidTagNumber: this.StudentData.rfid_number,
          studentFirstName: this.StudentData.first_name,
          studentLastName: this.StudentData.last_name,
          studentEmail: this.StudentData.email,
          studentIdNumber: this.StudentData.student_id,
          guardianFirstName: this.StudentData.guardian_first_name,
          guardianLastName: this.StudentData.guardian_last_name,
          guardianEmail: this.StudentData.guardian_email,
          guardianPhoneNumber: this.StudentData.guardian_phone_number,
          mailingAddress: this.StudentData.mailing_address,
          mailingCity: this.StudentData.city,
          mailingState: this.StudentData.state,
          mailingZip: this.StudentData.zip,
          schoolDistrict: this.StudentData.school_district,
          schoolName: this.StudentData.school,
          teacherName: this.StudentData.teacher,
          grade: this.StudentData.grade,
          roomNumber: this.StudentData.room_number,
          notes: this.StudentData.notes,



        });
      }

      else {
        this.toastr.success(response.message)
      }
    })
  }
  onSubmit() {
    this.client.editStudentDetails(this.students.value).then((response => {
      if (response.success === true) {
        this.Route.navigate(['/dashboard/student']);
        this.toastr.success(response.message)
      }
      else {
        this.toastr.error(response.message);
      }
    }))
  }
}
