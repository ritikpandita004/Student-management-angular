import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { ToastrService } from 'ngx-toastr';
declare let $: any
@Component({
  selector: 'app-school-calendar-information',
  templateUrl: './school-calendar-information.component.html',
  styleUrls: ['./school-calendar-information.component.scss']
})
export class SchoolCalendarInformationComponent implements OnInit {
  schoolCalendar: any
  schoolId: any
  schoolName: any
  schoolCalendarID: any
  SchoolCalendarDetails: any

  constructor(private Route: Router, private client: LoginService, private route: ActivatedRoute, private tostr: ToastrService) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      this.schoolId = id || "";

    });
  }

  ngOnInit(): void {
    this.getSchoolCalendarDetails()
  }

  addSchoolCalender(id: any) {
    this.Route.navigate(['dashboard/add-school-calendar', id])
  }

  getSchoolCalendarDetails() {
    this.client.getSchoolCalendar(this.schoolId).then((response) => {
      console.log(response.data)
      this.schoolCalendar = response.data
      this.schoolName = response.school[0].school_name

    })
  }



  deleteSchoolCalendar(id: any) {
    this.schoolCalendarID = id;
    $('#deleteModal').modal('show');
  }
  confirmDelete() {

    this.client.deleteschoolcalendar(this.schoolCalendarID).then((response) => {
      if (response.success == true) {
        $("#deleteModal").modal('hide');
        this.getSchoolCalendarDetails()
        this.tostr.success(response.message);
      }
    })


  }

  toggleSchoolCalendarStatus(classroomDetails: any) {
    this.SchoolCalendarDetails = classroomDetails;
    $('#statusModal').modal('show');
  }


  confirmStatusChange() {
    this.client.changeSchoolCalendarStatus({ id: this.SchoolCalendarDetails.id }).then((response) => {
      $('#statusModal').modal('hide');
      this.getSchoolCalendarDetails();
      this.tostr.success(response.message);
    }).catch((error) => {
      console.error('Error changing district status:', error);
      this.tostr.error('Failed to update district status.');
    });
  }


  editSchoolCalendar(id: any) {

    this.Route.navigate(['dashboard/edit-school-calendar',id]);
  }



}
