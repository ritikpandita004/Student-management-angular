import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ResetPasswordComponent } from './resetPassword/resetPassword.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthGuard } from './auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { CollapseModule } from 'angular-bootstrap-md';
import { CardsComponent } from './cards/cards.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardCardsComponent } from './dashboard-cards/dashboard-cards.component';
import { DistrictComponent } from './district/district.component';
import { AddDistrictComponent } from './add-district/add-district.component';
import { EditDistrictComponent } from './edit-district/edit-district.component';
import { DistrictCalenderComponent } from './district-calender/district-calender.component';
import { AddDistrictCalenderComponent } from './add-district-calender/add-district-calender.component';

import { EditDistrictCalendarComponent } from './edit-district-calendar/edit-district-calendar.component';
import { HolidayCalendarComponent } from './holiday-calendar/holiday-calendar.component';

import { AddholidayComponent } from './addholiday/addholiday.component';
import { EditHolidayComponent } from './edit-holiday/edit-holiday.component';
import { SchoolInformationViewComponent } from './school-information-view/school-information-view.component';
import { AddSchoolComponent } from './add-school/add-school.component';
import { EditSchoolComponent } from './edit-school/edit-school.component';
import { SchoolClassroomInformationComponent } from './school-classroom-information/school-classroom-information.component';
import { AddClassroomComponent } from './add-classroom/add-classroom.component';
import { EditClassroomComponent } from './edit-classroom/edit-classroom.component';
import { SchoolCalendarInformationComponent } from './school-calendar-information/school-calendar-information.component';
import { AddSchoolCalendarComponent } from './add-school-calendar/add-school-calendar.component';
import { EditSchoolCalendarComponent } from './edit-school-calendar/edit-school-calendar.component';
import { ApiInterceptor } from './api.interceptor';
import { AdminComponent } from './admin/admin.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { EditAdminComponent } from './edit-admin/edit-admin.component';
import { TeacherComponent } from './teacher/teacher.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { EditTeacherComponent } from './edit-teacher/edit-teacher.component';
import { StudentComponent } from './student/student.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { UserVerificationComponent } from './user-verification/user-verification.component';
import { UserVerificationCheckComponent } from './user-verification-check/user-verification-check.component';
import { EditStudentComponent } from './edit-student/edit-student.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    DashboardComponent,
    CardsComponent,
    NavbarComponent,
    SidebarComponent,
    ProfileComponent,
    DashboardCardsComponent,
    DistrictComponent,
    AddDistrictComponent,
    EditDistrictComponent,
    DistrictCalenderComponent,
    AddDistrictCalenderComponent,
    EditDistrictCalendarComponent,
    HolidayCalendarComponent,

    AddholidayComponent,
     EditHolidayComponent,
     SchoolInformationViewComponent,
     AddSchoolComponent,
     EditSchoolComponent,
     SchoolClassroomInformationComponent,
     AddClassroomComponent,
     EditClassroomComponent,
     SchoolCalendarInformationComponent,
     AddSchoolCalendarComponent,
     EditSchoolCalendarComponent,
     AdminComponent,
     AddAdminComponent,
     EditAdminComponent,
     TeacherComponent,
     AddTeacherComponent,
     EditTeacherComponent,
     StudentComponent,
     AddStudentComponent,
     UserVerificationComponent,
     UserVerificationCheckComponent,
     EditStudentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,

    CommonModule,
    CollapseModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 3000,
      preventDuplicates: true,
      progressBar: true,
      closeButton: true
    }),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxSpinnerModule.forRoot({ type: 'square-jelly-box' }),
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: localStorage.getItem('Language')


    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ApiInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
