import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-holiday',
  templateUrl: './edit-holiday.component.html',
  styleUrls: ['./edit-holiday.component.scss']
})
export class EditHolidayComponent implements OnInit {
  districtId:any;
  holidayDetails: any;

  constructor(
    private client: LoginService,
    private Route:Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.editDistrictHolidayView();
    const id = this.route.snapshot.paramMap.get('id');
    this.districtId=id;
  }

  editHolidayCalender: FormGroup = new FormGroup({
    holidayName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]+$')
    ]),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
  });

  editDistrictHolidayView() {
    const id = this.route.snapshot.paramMap.get('id');
    this.client.getholidayDetailsForUpdateView(id)
      .then((response: any) => {
        if (response && response.success) {
          this.holidayDetails = response.holidays[0];
          this.editHolidayCalender.patchValue({
            holidayName: this.holidayDetails.holiday_name,
            startDate: this.holidayDetails.start_date,
            endDate: this.holidayDetails.end_date,
          });
        }
      })
      .catch((error) => {
        this.toastr.error("Error fetching holiday details", "Error");
        console.error("Error fetching holiday details: ", error);
      });
  }

  editHolidayCalendarDetails() {
    if (this.editHolidayCalender.valid) {
      const updatedHoliday = this.editHolidayCalender.value;
      const id = this.route.snapshot.paramMap.get('id');
      this.client.updateHolidayDetails(updatedHoliday, id)
        .then((response: any) => {
          if (response.success) {
            this.toastr.success("Holiday updated successfully", "Success");
          } else {
            this.toastr.error("Failed to update holiday", "Error");
          }
        })
        .catch((error) => {
          this.toastr.error("An error occurred while updating holiday", "Error");
          console.error("Error updating holiday: ", error);
        });
    } else {
      this.toastr.warning("Form is invalid. Please check the inputs.", "Warning");
    }
  }

  returnToHolidayInfo(){
    this.Route.navigate(['dashboard/holidayCalendar'])
  }

}
