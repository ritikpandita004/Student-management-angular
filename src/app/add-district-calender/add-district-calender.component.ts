import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-district-calender',
  templateUrl: './add-district-calender.component.html',
  styleUrls: ['./add-district-calender.component.scss']
})
export class AddDistrictCalenderComponent implements OnInit {
  districtData: any;
  constructor(private client: LoginService, private toastr: ToastrService, private translate: TranslateService, private Route:Router) { }


  ngOnInit(): void {
    this.translate.setDefaultLang('en');


    const savedLanguage = localStorage.getItem('Language');
    if (savedLanguage) {
      this.addDistrictCalendar.get('language')?.setValue(savedLanguage);
      this.translate.use(savedLanguage);
    }
    this.getDistrictsInfo()

  }

  addDistrictCalendar: FormGroup = new FormGroup({
    districtName: new FormControl('', Validators.required),
    calendarName: new FormControl('', [Validators.required,   Validators.pattern('^[a-zA-Z]+$')]),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),


  });
    submitDistrictCalendarDetails(){
      this.client.addDistrictCalendar(this.addDistrictCalendar.value).then((response)=>{
        console.log(response);
        const responseData = response as { message: string };

        if (responseData && responseData.message) {
          this.Route.navigate(['dashboard/district-calender']);
          this.toastr.success(responseData.message);
        } else {
          this.toastr.error('Unexpected response format');
        }
      })
    }



    getDistrictsInfo() {
      this.client.getDistrictView().then((response: any) => {
        this.districtData = response.data;
        console.log(this.districtData);
      });
    }
    cancelbtn(){
      this.Route.navigate(['dashboard/district-calender'])
    }

}
