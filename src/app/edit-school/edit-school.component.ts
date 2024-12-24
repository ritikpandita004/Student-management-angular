import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-edit-school',
  templateUrl: './edit-school.component.html',
  styleUrls: ['./edit-school.component.scss']
})
export class EditSchoolComponent implements OnInit {
  schoolForm: FormGroup;
  schoolId: any;
  imageUrl: string | ArrayBuffer | null = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private toastr:ToastrService,
    private Client:LoginService,
  ) {
    this.schoolForm = this.fb.group({
      image: [null],
      school_name: ['', Validators.required],
      school_code: ['', Validators.required],
      school_year: ['', Validators.required],
      office_email: ['', [Validators.required, Validators.email]],
      office_phone_number: ['', Validators.required],
      office_fax_number: [''],
      physical_address: ['', Validators.required],
      physical_district: ['', Validators.required],
      physical_city: ['', Validators.required],
      physical_state: ['', Validators.required],
      physical_zip: ['', Validators.required],
      mailing_address: [''],
      mailing_city: [''],
      mailing_state: [''],
      mailing_zip: [''],
      principal_first_name: ['', Validators.required],
      principal_last_name: ['', Validators.required],
      principal_phone_number: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      notes: [''],

    });
  }

  ngOnInit(): void {
    this.schoolId = this.route.snapshot.paramMap.get('id');
    this.getSchoolData(this.schoolId);
  }

  getSchoolData(id: any): void {
    this.httpClient.get<any>(`http://localhost:8000/api/school/school-edit-view/${id}`)
      .subscribe(response => {
        if (response.success) {
          const { image, ...schoolData } = response.school;
          this.schoolForm.patchValue(schoolData);
          this.imageUrl = `http://localhost:8000/storage/school_images/${image}`;
        }
      }, error => {
        console.error('Error fetching school data', error);
      });
  }

  onImageChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  ClassroomView() {
    this.router.navigate(['dashboard/ClassroomView']);
  }

  updateSchool(){
    const editSchool=this.schoolForm.value;
    this.Client.UpdateSchoolInfo(editSchool, this.schoolId).then()

    .then((response: any) => {
      if (response && response.success) {
        this.router.navigate(['dashboard/schoolInfo'])
        this.toastr.success(response.message);
      } else {
        console.error('Failed to update profile:', response.message);
      }
    })

  }

  addEditSchoolCalendar(id:any){

    this.router.navigate(['dashboard/school-calendar',id])
  }
}
