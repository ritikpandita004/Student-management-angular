import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-district-calendar',
  templateUrl: './edit-district-calendar.component.html',
  styleUrls: ['./edit-district-calendar.component.scss']
})
export class EditDistrictCalendarComponent implements OnInit {
  districtData: any;

  districtCalendar:any;

  districtCalenderId:string='';

  constructor(private client: LoginService, private toastr: ToastrService,private route: ActivatedRoute, private translate: TranslateService,
    private router: Router) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      this.districtCalenderId=id || "";

    });
   }

  ngOnInit(): void {
    this.translate.setDefaultLang('en');


    const savedLanguage = localStorage.getItem('Language');
    if (savedLanguage) {
      this.EditDistrictCalendar.get('language')?.setValue(savedLanguage);
      this.translate.use(savedLanguage);
    }
    this.getDistrictsInfo()
    this.editDistrictCalenderView()
  }


  EditDistrictCalendar:FormGroup=new FormGroup({
    districtName: new FormControl('', Validators.required),
    calendarName: new FormControl('', [Validators.required,   Validators.pattern('^[a-zA-Z]+$')]),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),

    });



  getDistrictsInfo() {
    this.client.getDistrictView().then((response: any) => {
      this.districtData = response.data;
      console.log(this.districtData);
    });
  }



  editDistrictCalenderView(){


    this.client.getDistrictCalendarInfo(this.districtCalenderId)

    .then((response: any) => {

      if (response && response.success) {
        this.districtCalendar = response.showDistricts,

        console.log('API response:',  this.districtCalendar);

        this.EditDistrictCalendar.patchValue({
          districtName: this.districtCalendar.districtName,
          calendarName:this.districtCalendar.calendarName,
          startDate:this.districtCalendar.startDate,
          endDate:this.districtCalendar.endDate,

        });
      }
    })

  }

  editDistrictCalenderInfo(){

    const editDistricts=this.EditDistrictCalendar.value;
    this.client.UpdateDistrictCalendarInfo(editDistricts, this.districtCalenderId).then()

    .then((response: any) => {
      if (response && response.success) {
        this.toastr.success(response.message);
      } else {
        console.error('Failed to update profile:', response.message);
      }
    })
    .catch(err => {
      console.error('Error updating profile:', err);
    });
}
cancelbtn(){
  this.router.navigate(['dashboard/district-calender'])
}

}
