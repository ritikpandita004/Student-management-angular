import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  verifyBackupCode(userId: string, backupCode: string) {
    throw new Error('Method not implemented.');
  }
  private language: string = 'en';

  constructor(
    private client: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService,
    private translate: TranslateService
  ) {}


  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Accept-Language': this.language || 'en',
      'Authorization': sessionStorage.getItem('jwtToken') || ''
    });
  }

  submitLoginDetails(loginData: any): Promise<any> {
    this.language = this.translate.currentLang;
    return this.client.post<any>('http://localhost:8000/api/auth/login', {
      email: loginData.value.email,
      password: loginData.value.password

    }, { headers: this.getHeaders() }).toPromise();
  }

  sendEmailVerification(data: any): Promise<any> {
    console.log(data);
    return this.client.post<any>('http://localhost:8000/api/auth/forgot-password', {
      email: data.email,
    }, { headers: this.getHeaders() }).toPromise();
  }

  sendEmailToken(data: any): Promise<any> {
    console.log('Sending data to API:', data); // Log data to inspect
    return this.client.post(`http://localhost:8000/api/auth/resetPassword/${data?.token}`, {
      password: data.password,
      confirmPassword: data.confirmPassword
    }, { headers: this.getHeaders() }).toPromise();
  }

  getUserDetails(): Promise<any> {
    return this.client.get<any>('http://localhost:8000/api/auth/profileUpdation', { headers: this.getHeaders() }).toPromise();
  }

  updateDetails(profileData: any): Promise<any> {
    this.language = this.translate.currentLang;
    console.log(this.language);
    return this.client.put<any>('http://localhost:8000/api/auth/updateProfileDetails', profileData, { headers: this.getHeaders() }).toPromise();
  }

  setLanguage(lang: string) {
    this.language = lang;
  }


  submitDistrictInformation(data:any){
    return this.client.post('http://localhost:8000/api/districts/add-districts',data,
      { headers: this.getHeaders() }
    ).toPromise();

  }


  getDistrictInfo(id:string): Promise<any> {
    return this.client.get<any>(`http://localhost:8000/api/districts/update-districts-view/${id}`,{ headers: this.getHeaders() }).toPromise();
  }


  getDistrictView(): Promise<any> {
    return this.client.get<any>('http://localhost:8000/api/districts/get-districts', { headers: this.getHeaders() }).toPromise();
  }



  UpdateDistrictInfo(data:any, district_id:string){
    return this.client.put<any>(`http://localhost:8000/api/districts/update-districts/${district_id}`, data, { headers: this.getHeaders() }).toPromise();
  }

  deleteDistrict(id:string){
    return this.client.delete<any>(`http://localhost:8000/api/districts/delete-districts/${id}`, { headers: this.getHeaders() }).toPromise();
  }


  addDistrictCalendar(data:any){
    return this.client.post<any>('http://localhost:8000/api/districts/add-district-calendar',data, { headers: this.getHeaders() }).toPromise();
  }

  getDistrictCalendarView(): Promise<any> {
    return this.client.get<any>('http://localhost:8000/api/districts/get-district-calendar', { headers: this.getHeaders() }).toPromise();
  }
  changeDistrictStatus(data: any): Promise<any> {
    return this.client.post<any>('http://localhost:8000/api/districts/change-status', data, { headers: this.getHeaders() }).toPromise();
}


getDistrictCalendarInfo(id:any): Promise<any> {
  return this.client.get<any>(`http://localhost:8000/api/districts/update-districts-calendar-view/${id}`,{ headers: this.getHeaders() }).toPromise();
}



UpdateDistrictCalendarInfo(data:any, district_id:string){
  return this.client.put<any>(`http://localhost:8000/api/districts/update-districts-calendar/${district_id}`, data, { headers: this.getHeaders() }).toPromise();
}


deleteDistrictCalendar(id:string){
  return this.client.delete<any>(`http://localhost:8000/api/districts/delete-districts-calender/${id}`, { headers: this.getHeaders() }).toPromise();
}


changeDistrictCalendarStatus(data: any): Promise<any> {
  return this.client.post<any>('http://localhost:8000/api/districts/change-districts-calender-status', data, { headers: this.getHeaders() }).toPromise();
}

saveholidays(data: any, id:any): Promise<any> {
  return this.client.post<any>(`http://localhost:8000/api/districts/district-holidays/${id}`, data,{ headers: this.getHeaders() }).toPromise();
}

getholidayDetails( id:any): Promise<any> {
  return this.client.get<any>(`http://localhost:8000/api/districts/get-district-holidays/${id}`,{ headers: this.getHeaders() }).toPromise();
}


getholidayDetailsForUpdateView( id:any): Promise<any> {
  return this.client.get<any>(`http://localhost:8000/api/districts/get-district-holidays-update-view/${id}`,{ headers: this.getHeaders() }).toPromise();
}



updateHolidayDetails(data:any, id:any){
  return this.client.put<any>(`http://localhost:8000/api/districts/update-districts-holidays/${id}`, data, { headers: this.getHeaders() }).toPromise();
}

deleteHoliday(id: any) {
  return this.client.delete<any>(`http://localhost:8000/api/districts/delete-holiday/${id}`, { headers: this.getHeaders() }).toPromise();
}


addSchool(data: any) {
  return this.client.post<any>('http://localhost:8000/api/school/add-school', data,{headers: this.getHeaders()}).toPromise();
}



getSchoolView(): Promise<any> {
  return this.client.get<any>('http://localhost:8000/api/school/get-school-details', { headers: this.getHeaders() }).toPromise();
}



deleteSchool(id:string){
  return this.client.delete<any>(`http://localhost:8000/api/school/delete-school/${id}`, { headers: this.getHeaders() }).toPromise();
}

changeSchoolStatus(data: any): Promise<any> {
  return this.client.post<any>('http://localhost:8000/api/school/change-school-status', data, { headers: this.getHeaders() }).toPromise();
}


changeHolidayStatus(data: any): Promise<any> {
  return this.client.post<any>('http://localhost:8000/api/districts/change-holiday-status', data, { headers: this.getHeaders() }).toPromise();
}


schoolEditView(id:any): Promise<any> {
  return this.client.get<any>(`http://localhost:8000/api/school/school-edit-view/${id}`,{ headers: this.getHeaders() }).toPromise();
}


UpdateSchoolInfo(data:any, id:string){
  return this.client.put<any>(`http://localhost:8000/api/school/school/update-school/${id}`, data, { headers: this.getHeaders() }).toPromise();
}


submitClassroomDetails(data:any){
  return this.client.post<any>('http://localhost:8000/api/school/add-classroom', data, { headers: this.getHeaders() }).toPromise();
}



getClassroomView(): Promise<any> {
  return this.client.get<any>('http://localhost:8000/api/school/get-classroom-details', { headers: this.getHeaders() }).toPromise();
}

deleteClassroom(id:string){
  return this.client.delete<any>(`http://localhost:8000/api/school/delete-classroom/${id}`, { headers: this.getHeaders() }).toPromise();
}

editclassroomView(id:any){
return this.client.get(`http://localhost:8000/api/school/update-classroom-view/${id}`, { headers: this.getHeaders() }).toPromise();
}


submitEditClassroomDetails(data:any, id:any){
  return this.client.post<any>(`http://localhost:8000/api/school/edit-classroom/${id}`, data, { headers: this.getHeaders() }).toPromise();
}


changeClassroomStatus(data: any): Promise<any> {
  return this.client.post<any>('http://localhost:8000/api/school/change-classroom-status', data, { headers: this.getHeaders() }).toPromise();
}

submitSchoolCalendar(data:any,id:any){
  return this.client.post<any>(`http://localhost:8000/api/school/add-school-calendar/${id}`, data, { headers: this.getHeaders() }).toPromise();
}


getSchoolCalendar(id:any): Promise<any> {
  return this.client.get<any>(`http://localhost:8000/api/school/get-school-calendar-details/${id}`, { headers: this.getHeaders() }).toPromise();
}

deleteschoolcalendar(id:string){
  return this.client.delete<any>(`http://localhost:8000/api/school/delete-school-calendar/${id}`, { headers: this.getHeaders() }).toPromise();
}

changeSchoolCalendarStatus(data: any): Promise<any> {
  return this.client.post<any>('http://localhost:8000/api/school/change-school-calendar-status', data, { headers: this.getHeaders() }).toPromise();
}


getSchoolCalendarInfo(id:any){
  return this.client.get(`http://localhost:8000/api/school/school-calendar-details/${id}`, { headers: this.getHeaders() }).toPromise();
  }



  UpdateSchoolCalendarInfo(data:any, id:string){
  return this.client.put<any>(`http://localhost:8000/api/school/update-school-calendar/${id}`, data, { headers: this.getHeaders() }).toPromise();
}

adminDetilsSubmit(data: any){
  return this.client.post<any>(`http://localhost:8000/api/Admin/add-admin`, data, { headers: this.getHeaders() }).toPromise();
}



getDistrictsForAdmin(): Promise<any> {
  return this.client.get<any>('http://localhost:8000/api/Admin/get-districts-for-admin-view', { headers: this.getHeaders() }).toPromise();
}




getSchoolsByDistricts(districtIds: number[]): Promise<any> {
  return this.client.post<any>('http://localhost:8000/api/Admin/get-Schools', { districtIds }).toPromise();
}



allAdminDetails(): Promise<any>{
  return this.client.get('http://localhost:8000/api/Admin/get-all-admin-details' ).toPromise();
}


deleteAdmin(id:any):Promise<any>{
return this.client.delete(`http://localhost:8000/api/Admin/delete-admin/${id}`).toPromise()
}


getAdminEditDetails(id:any):Promise<any>{
  return this.client.get(`http://localhost:8000/api/Admin/edit-admin-view/${id}`).toPromise()
}

changeAdminStatus(data: any): Promise<any> {
  return this.client.post<any>('http://localhost:8000/api/Admin/change-status', data, { headers: this.getHeaders() }).toPromise();
}


getSchoolDistrict(): Promise<any>{
  return this.client.get("http://localhost:8000/api/teacher/get-school-district",{ headers: this.getHeaders() }).toPromise();
}


getSchoolName(id:any):Promise<any>{

  return this.client.get(`http://localhost:8000/api/teacher/get-school-name/${id}`,{ headers: this.getHeaders() }).toPromise();
}


saveTeacher(data:any):Promise<any>{

  return this.client.post('http://localhost:8000/api/teacher/save-teachers',data,{ headers: this.getHeaders() }).toPromise();
}


getTeachersDetails():Promise<any>{
  return this.client.get('http://localhost:8000/api/teacher/get-teachers-list',{ headers: this.getHeaders() }).toPromise();
}

deleteTeacherDetails(id:number):Promise<any>{
  return this.client.delete(`http://localhost:8000/api/teacher/delete-teachers/${id}`,{ headers: this.getHeaders() }).toPromise();
}

getTeacherDetailsById(id:any):Promise<any>{
  return this.client.get(`http://localhost:8000/api/teacher/edit-teachers-view/${id}`,{ headers: this.getHeaders() }).toPromise();
}






getSchoolAndDistrictDetails(districtId: string, schoolId: string):Promise<any> {
  return this.client.post<any>('http://localhost:8000/api/teacher/teacher-school-and-district', { districtId, schoolId }).toPromise();
}


changeTeacherStatus(data: any): Promise<any> {
  return this.client.post<any>('http://localhost:8000/api/teacher/change-status', data, { headers: this.getHeaders() }).toPromise();
}


submitStudentDetails(data:any):Promise<any>{
  return this.client.post<any>('http://localhost:8000/api/student/add-student',data,{ headers: this.getHeaders() }).toPromise();
}

studentDetailsView():Promise<any>{
  return this.client.get<any>('http://localhost:8000/api/student/student-view',{ headers: this.getHeaders() }).toPromise();
}


verifyOtp(otp: string, id: string, google2fa_secret: string) {
  return this.client.post<any>(`http://localhost:8000/api/complete-registration`, {
    id,
    google2fa_secret,
    token: otp,
  }).toPromise();
}



verifyBackupCodes(id: string, otp: string, google2fa_secret: string) {
  return this.client.post<any>(`http://localhost:8000/api/complete-registration-by-backup-code`, {
    id,
    backup_code: otp,
  }).toPromise();
}


deleteStudent(id:any):Promise<any>{
  return this.client.delete(`http://localhost:8000/api/student/delete-student/${id}`,{ headers: this.getHeaders() }).toPromise();
}


editStudentDetails(data:any):Promise<any>{
  return this.client.post('http://localhost:8000/api/student/edit-student',data,{ headers: this.getHeaders() }).toPromise();
}
getstudentById(id:any):Promise<any>{
  return this.client.get(`http://localhost:8000/api/student/get-student-by-id/${id}`,{ headers: this.getHeaders() }).toPromise();
}

changeStudentStatus(id:any):Promise<any>{
  return this.client.post(`http://localhost:8000/api/student/change-student-status/${id}`,{ headers: this.getHeaders() }).toPromise();
}


getBackupCodes(userId: string): Observable<any> {
  return this.client.get<any>(`http://localhost:8000/api/get-backup-codes/${userId}`);
}






}
