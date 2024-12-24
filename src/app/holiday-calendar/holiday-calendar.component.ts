import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { Modal } from 'bootstrap';
import { ToastrService } from 'ngx-toastr';
declare let $: any
@Component({
  selector: 'app-holiday-calendar',
  templateUrl: './holiday-calendar.component.html',
  styleUrls: ['./holiday-calendar.component.scss']
})
export class HolidayCalendarComponent implements OnInit {
  selectedHoliday:any
  holidayDetails: any;
  holidayToDelete: any;

  constructor(private route: Router, private activatedRoute: ActivatedRoute, private client: LoginService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getHolidayCalendarDetails();
  }

  addHoliday() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.route.navigate(['dashboard/add-holiday', id]);
  }

  getHolidayCalendarDetails() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.client.getholidayDetails(id).then((response) => {
      this.holidayDetails = response.holidays;
    });
  }

  editHoliday(id: any) {
    this.route.navigate(['dashboard/edit-holiday', id]);
  }
  deleteHoliday(id: any) {
    this.holidayToDelete = id;
    const modalElement = document.getElementById('confirmDeleteModal');


    if (modalElement) {
        const modal = new Modal(modalElement);
        modal.show();
    } else {
        console.error('Modal element not found');
    }
}


confirmDelete() {
    this.client.deleteHoliday(this.holidayToDelete).then((response) => {
        if (response.success) {
          this.toastr.success(response.message)
            this.getHolidayCalendarDetails();
            this.holidayToDelete = null;
            const modalElement = document.getElementById('confirmDeleteModal');


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
        } else {
            console.error('Failed to delete holiday');
        }
    }).catch((error) => {
        console.error('Error deleting holiday: ', error);
    });
}


toggleHolidayStatus(holiday: any) {
  this.selectedHoliday = holiday;
  const modalElement = document.getElementById('statusModal');

  if (modalElement) {
    const modal = new Modal(modalElement);
    modal.show();
  } else {
    console.error('Modal element not found');
  }
}

confirmStatusChange() {
  this.client.changeHolidayStatus({ id: this.selectedHoliday.id }).then((response) => {
    const modalElement = document.getElementById('statusModal');

    if (modalElement) {
      const modal = Modal.getInstance(modalElement);

      if (modal) {
        modal.hide();
      }
    }

    this.getHolidayCalendarDetails();
    this.toastr.success(response.message);
  }).catch((error) => {
    console.error('Error changing holiday status:', error);
    this.toastr.error('Failed to update holiday status.');
  });
}

}
