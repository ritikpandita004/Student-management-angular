import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { ToastrService } from 'ngx-toastr';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
studentDetails:any
studentId:any;
  constructor(private Route:Router, private client:LoginService, private tostar:ToastrService) { }

  ngOnInit(): void {
    this.studentView();

  }

  addStudent(){
    this.Route.navigate(['dashboard/add-student']);

  }

  studentView(){
    this.client.studentDetailsView().then((response)=>{
      if(response.success==true){
        console.log(response.data);
        this.studentDetails=response.data
      }

      else{
        this.tostar.error(response.message);
      }
    })
  }

  deleteStudents(id:any){
    this.client.deleteStudent(id).then((response)=>{
      if(response.success===true){
        this.studentView();
        this.tostar.success(response.message);
      }

      else{
        this.studentView();
        this.tostar.error(response.message);
      }


    });

  }

  editStudent(id:any){
    this.Route.navigate(['dashboard/edit-student',id])


  }
  togglechangeStudentStatus(id: any) {
    this.studentId = id;
    const modalElement = document.getElementById('statusModal');

    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    } else {
      console.error('Modal element not found');
    }
  }



  confirmStatusChange() {
    this.client.changeStudentStatus(this.studentId ).then((response) => {
      const modalElement = document.getElementById('statusModal');

      if (modalElement) {
        const modal = Modal.getInstance(modalElement);

        if (modal) {
          modal.hide();
        } else {
          console.error('Failed to get modal instance');
        }
      } else {
        console.error('Modal element not found');
      }

      this.studentView();
      this.tostar.success(response.message);
    }).catch((error) => {
      console.error('Error changing student status:', error);
      this.tostar.error('Failed to update student status.');
    });
  }



  changeStudentStatus(id:any){
    this.client.changeStudentStatus(id).then((resposne)=>{

    })
  }
}
