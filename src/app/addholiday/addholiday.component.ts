import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addholiday',
  templateUrl: './addholiday.component.html',
  styleUrls: ['./addholiday.component.scss']
})
export class AddholidayComponent implements OnInit {
districtId:any
  constructor(private client:LoginService, private route:ActivatedRoute , private toastr:ToastrService, private Route:Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.districtId=id;
  }

  holidayCalender: FormGroup=new FormGroup({


    holidayName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z]+$')
    ]),
    startDate: new FormControl('',Validators.required),

    endDate: new FormControl('', Validators.required ),


  });


  saveHolidayCalendarDetails(){
    const id = this.route.snapshot.paramMap.get('id');

    this.client.saveholidays(this.holidayCalender.value, id).then((response)=>{
       const responseData = response as { message: string };
      if (responseData && responseData.message) {
        this.toastr.success(responseData.message);
        this.Route.navigate(['dashboard/holidayCalendar',id])
      } else {
        this.toastr.error('Unexpected response format');
      }
    });
  }

  returnToHolidayInfo(){
    console.log(this.districtId)
    const id=this.districtId
    this.Route.navigate(['dashboard/holidayCalendar',id])
  }

}
