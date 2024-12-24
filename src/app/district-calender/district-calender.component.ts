import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { ToastrService } from 'ngx-toastr';
import { Modal } from 'bootstrap';
declare let $: any
@Component({
  selector: 'app-district-calender',
  templateUrl: './district-calender.component.html',
  styleUrls: ['./district-calender.component.scss']
})
export class DistrictCalenderComponent implements OnInit {
  districtCalenderData:any;
  selectedCalendar: any;

  districtCalendarId:any;
  constructor(private Route:Router, private client:LoginService, private toastr: ToastrService) {

   }

  ngOnInit(): void {
    this.getDistrictCalendarInfo()
  }
  addDistrictCalender(){
    this.Route.navigate(['dashboard/add-district-calender']);

  }

  editDistrictCalendar(id:any){
    this.Route.navigate(['dashboard/edit-district-calendar',id])
  }

  getDistrictCalendarInfo() {
    this.client.getDistrictCalendarView().then((response: any) => {
      this.districtCalenderData = response.data;
      console.log(this.districtCalenderData);
    });
  }


  deleteDistrictCalendar(id: string) {
    this.districtCalendarId = id;
    $('#deleteModal').modal('show');
  }


  confirmDelete() {
    this.client.deleteDistrictCalendar(this.districtCalendarId).then((response) => {

      $('#deleteModal').modal('hide');

      this.getDistrictCalendarInfo();

      this.toastr.success(response.message);

    }).catch((error) => {
      console.error('Error deleting district:', error);
    });
  }

  toggleDistrictStatus(calendar: any) {
    this.selectedCalendar = calendar;
    const modalElement = document.getElementById('confirmationModal');

    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }




  confirmToggleStatus() {
    const modalElement = document.getElementById('confirmationModal');

    this.client.changeDistrictCalendarStatus({ id: this.selectedCalendar.id }).then((response) => {
      if (modalElement) {
        const modal = Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }

      this.getDistrictCalendarInfo();
      this.toastr.success(response.message);
    });
  }

  viewHolidayCalendar(id:any){
    this.Route.navigate(['dashboard/holidayCalendar',id])
  }
}
