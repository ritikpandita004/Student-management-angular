import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { ToastrService } from 'ngx-toastr';
declare let $: any
import { Modal } from 'bootstrap';
@Component({
  selector: 'app-school-classroom-information',
  templateUrl: './school-classroom-information.component.html',
  styleUrls: ['./school-classroom-information.component.scss']
})

export class SchoolClassroomInformationComponent implements OnInit {
  classroom: any
  classroomdetails:any

  classroomId: any
  constructor(private Route: Router, private client: LoginService, private tostr:ToastrService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getClassDetails()
  }


  addClassroom() {
    this.Route.navigate(['dashboard/add-classroom'])
  }

  getClassDetails() {
    this.client.getClassroomView().then((response) => {
      console.log(response.data)
      this.classroom = response.data
    })

  }

  deleteClassroom(id: any) {
    this.classroomId = id;
    const modalElement = document.getElementById('deleteModal');

    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    } else {
      console.error('Modal element not found');
    }
  }

  confirmDelete() {
    const modalElement = document.getElementById('deleteModal');

    this.client.deleteClassroom(this.classroomId).then((response) => {
      if (response.success) {
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

        this.getClassDetails();
        this.tostr.success(response.message);
      } else {
        console.error('Failed to delete classroom');
      }
    }).catch((error) => {
      console.error('Error deleting classroom:', error);
    });
  }


  editClassroom(id:any){
    this.Route.navigate(['dashboard/editClassroom',id])
  }



  toggleDistrictStatus(classroomDetails: any) {
    this.classroomdetails = classroomDetails;
    const modalElement = document.getElementById('statusModal');

    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    } else {
      console.error('Modal element not found');
    }
  }


  confirmStatusChange() {
    const modalElement = document.getElementById('statusModal');

    this.client.changeClassroomStatus({ id: this.classroomdetails.id }).then((response) => {
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

      this.getClassDetails();
      this.toastr.success(response.message);
    }).catch((error) => {
      console.error('Error changing classroom status:', error);
      this.toastr.error('Failed to update classroom status.');
    });
  }


}

