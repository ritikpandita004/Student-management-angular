import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  constructor(private client: LoginService, private Route: Router, private spinner: NgxSpinnerService, private toastr:ToastrService) { }

  ngOnInit(): void {
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


  onSubmit() {
    this.spinner.show();

    this.client.submitStudentDetails(this.students.value).then((response) => {
      this.spinner.hide();

      if(response.success==true){
        this.Route.navigate(['dashboard/student'])
        this.toastr.success(response.message)
      }

      else{
        this.toastr.error(response.message)
      }



    })
  }

  getAllStudentList(){

  }


  cancelbtn() {
    this.Route.navigate(['dashboard/student'])
  }

}
