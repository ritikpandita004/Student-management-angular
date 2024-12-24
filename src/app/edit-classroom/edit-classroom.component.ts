import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LoginService } from '../service/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-classroom',
  templateUrl: './edit-classroom.component.html',
  styleUrls: ['./edit-classroom.component.scss']
})
export class EditClassroomComponent implements OnInit {
classroomId:any
editclassroomView:any
  constructor(private route:ActivatedRoute, private client:LoginService, private tostr:ToastrService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params:ParamMap)=>{
    let id=params.get("id");
    this.classroomId=id;
    this.editClassroomView()
    });
  }
  editClassroom:FormGroup=new FormGroup({
    grade:new FormControl(''),
    classroomNumber: new FormControl(''),
    team: new FormControl(''),
    capacity: new FormControl(''),
    defaultAttenanceStatus: new FormControl(''),
    collectAttendence: new FormControl(''),
    homeroomClass: new FormControl(''),
  })

  editClassroomView(){
    this.client.editclassroomView(this.classroomId).then((response:any) => {
        this.editclassroomView = response.data;

        this.editClassroom.patchValue({
            grade: this.editclassroomView.Grade,
            classroomNumber: this.editclassroomView.classroom_number,
            team: this.editclassroomView.team,
            capacity: this.editclassroomView.capacity,
            defaultAttenanceStatus: this.mapAttendanceStatus(this.editclassroomView.attendence_status),
            collectAttendence: this.mapCollectAttendance(this.editclassroomView.collect_attendence),
            homeroomClass: this.mapHomeroomClass(this.editclassroomView.homeroom_class)
        });
    });
}

mapAttendanceStatus(status: string) {
    return status === 'Present' ? 1 : status === 'Absent' ? 2 : '';
}

mapCollectAttendance(status: string) {
    return status === 'Yes' ? 1 : status === 'No' ? 2 : '';
}

mapHomeroomClass(status: string) {
    return status === 'Yes' ? 1 : status === 'No' ? 2 : '';
}

editClassroomdDetails(){

  this.client.submitEditClassroomDetails(this.editClassroom.value,this.classroomId).then((response)=>{
    this.tostr.success(response.message)

  })

}



}
