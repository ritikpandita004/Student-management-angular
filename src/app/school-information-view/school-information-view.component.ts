import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { ToastrService } from 'ngx-toastr';
declare let $: any
@Component({
  selector: 'app-school-information-view',
  templateUrl: './school-information-view.component.html',
  styleUrls: ['./school-information-view.component.scss']
})
export class SchoolInformationViewComponent implements OnInit {
  schoolData: any;
  selectedSchool: any;
  schoolId: any;

  constructor(private router: Router, private client: LoginService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getschoolInfo();
  }

  addSchool() {
    this.router.navigate(['dashboard/add-school']);
  }

  schoolEditView(id:any) {
    this.router.navigate(['dashboard/edit-school',id]);
  }

  getschoolInfo() {
    this.client.getSchoolView().then((response: any) => {
      this.schoolData = response.data;
      console.log(this.schoolData);
    }).catch((error) => {
      console.error('Error fetching school information:', error);
    });
  }

  deleteSchoolInfo(id: any) {
    this.schoolId = id;
    $('#deleteModal').modal('show');
  }

  confirmDelete() {
    this.client.deleteSchool(this.schoolId).then((response) => {
      $('#deleteModal').modal('hide');
      this.getschoolInfo();
      this.toastr.success(response.message);
    }).catch((error) => {
      console.error('Error deleting school:', error);
    });
  }

  toggleSchoolStatus(school: any) {
    this.selectedSchool = school;
    $('#statusModal').modal('show');
  }

  confirmStatusChange() {
    this.client.changeSchoolStatus({ id: this.selectedSchool.id }).then((response) => {
      $('#statusModal').modal('hide');
      this.getschoolInfo();
      this.toastr.success(response.message);
    }).catch((error) => {
      console.error('Error changing district status:', error);
      this.toastr.error('Failed to update district status.');
    });
  }
}
