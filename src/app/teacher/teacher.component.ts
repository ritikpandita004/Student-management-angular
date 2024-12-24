import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { ToastrService } from 'ngx-toastr';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
  teacherList: any
  selectedTeacherId: any;
  constructor(private Route: Router, private client: LoginService, private tostr: ToastrService) { }

  ngOnInit(): void {

    this.getTeachersList()
  }
  addTeacher() {
    this.Route.navigate(['dashboard/add-teacher'])
  }


  getTeachersList() {
    this.client.getTeachersDetails().then((response) => {

      if (response) {
        this.teacherList = response.data
      }

      else {
        this.tostr.error(response.message)
      }

    })
  }


  openDeleteModal(id: any) {
    this.selectedTeacherId = id;
    const confirmModal = document.getElementById('confirmDeleteModal');
    if (confirmModal) {
      const modalInstance = new Modal(confirmModal);
      modalInstance.show();
    }
  }

  confirmDelete() {
    if (this.selectedTeacherId) {
      this.client.deleteTeacherDetails(this.selectedTeacherId).then((response) => {
        if (response.success === true) {
          this.getTeachersList();
          this.tostr.success(response.message);
        } else {
          this.tostr.error(response.message);
        }
      });
    }
  }


  toggleSchoolCalendarStatus(district: any) {
    this.selectedTeacherId = district;
    const modalElement = document.getElementById('statusModal');

    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    } else {
      console.error('Modal element not found');
    }
  }

  confirmStatusChange() {
    this.client.changeTeacherStatus({ id: this.selectedTeacherId.id }).then((response) => {
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

      this.getTeachersList();
      this.tostr.success(response.message);
    }).catch((error) => {
      console.error('Error changing Admin status:', error);
      this.tostr.error('Failed to update Admin status.');
    });
  }




  editTeacherDetail(id:any){
    this.Route.navigate(['dashboard/edit-teacher',id])

  }

}
