import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-school-calendar',
  templateUrl: './edit-school-calendar.component.html',
  styleUrls: ['./edit-school-calendar.component.scss']
})
export class EditSchoolCalendarComponent implements OnInit {
  schoolCalenderId:any;
  schoolCalendarDetails:any
  constructor(private client:LoginService, private Route:ActivatedRoute, private toastr:ToastrService, private Router:Router) {
    this.Route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      this.schoolCalenderId=id || "";

    });
  }

  ngOnInit(): void {
    this.getSchoolCalendarInfo()
  }
  editSchoolCalendar:FormGroup=new FormGroup({
    schoolCalendarName:new FormControl(''),
    startDate:new FormControl(''),
    endDate:new FormControl('')

  })


  editSchoolCalendarDetails(){
    this.client.UpdateSchoolCalendarInfo(this.editSchoolCalendar.value, this.schoolCalenderId).then()

    .then((response: any) => {
      if (response && response.success) {
        this.Router.navigate(['dashboard/school-calendar','all'])
        this.toastr.success(response.message);
      } else {
        console.error('Failed to update profile:', response.message);
      }
    })
    .catch(err => {
      console.error('Error updating profile:', err);
    });
  }

  getSchoolCalendarInfo() {
    this.client.getSchoolCalendarInfo(this.schoolCalenderId).then((response: any) => {

      if(response.success==true){
        this.schoolCalendarDetails=response.data
        this.editSchoolCalendar.patchValue({
          schoolCalendarName:this.schoolCalendarDetails.School_calendar_name,
          startDate:this.schoolCalendarDetails.start_date,
          endDate:this.schoolCalendarDetails.end_date

        })
      }

    });
  }


  backToSchoolCalendar(){
    this.Router.navigate(['dashboard/school-calendar','all'])
  }
}
