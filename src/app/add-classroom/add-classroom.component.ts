import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-classroom',
  templateUrl: './add-classroom.component.html',
  styleUrls: ['./add-classroom.component.scss']
})
export class AddClassroomComponent implements OnInit {

  constructor(private client:LoginService , private tostr:ToastrService) { }

  ngOnInit(): void {
  }


  addClassroom:FormGroup=new FormGroup({
    grade:new FormControl(''),
    classroomNumber: new FormControl(''),
    team: new FormControl(''),
    capacity: new FormControl(''),
    defaultAttenanceStatus: new FormControl(''),
    collectAttendence: new FormControl(''),
    homeroomClass: new FormControl(''),
  })

  addClassroomDetails(){
this.client.submitClassroomDetails(this.addClassroom.value).then((response)=>{
  if(response.success==true)

    {
      this.tostr.success(response.message);
    }

    if(response.success==false)
      {
      this.tostr.error(response.message)
    }
})

  }

}
