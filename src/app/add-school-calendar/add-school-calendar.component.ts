import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-add-school-calendar',
  templateUrl: './add-school-calendar.component.html',
  styleUrls: ['./add-school-calendar.component.scss']
})
export class AddSchoolCalendarComponent implements OnInit {
schoolCalendar:any
schoolId:any
  constructor(private client:LoginService, private route: ActivatedRoute, private Route:Router) {
     this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      this.schoolId=id || "";

    });
   }

  ngOnInit(): void {

  }
  addSchoolCalendar: FormGroup = new FormGroup({

    schoolCalendarName: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),

  })

  submitSchoolCalendar(){
    this.client.submitSchoolCalendar(this.addSchoolCalendar.value, this.schoolId).then((response)=>{

    })
  }

  cancelbtn(){
    this.Route.navigate(['dashboard/school-calendar',"all"])
  }
}
