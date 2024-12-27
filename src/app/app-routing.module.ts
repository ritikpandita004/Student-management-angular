import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './resetPassword/resetPassword.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { AuthGuardForNoTokenGuard } from './auth-guard-for-no-token.guard';
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
import { VerifyByBackupCodesComponent } from './verify-by-backup-codes/verify-by-backup-codes.component';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [AuthGuardForNoTokenGuard] },
  { path: '2fa-verification', component: UserVerificationComponent, canActivate: [AuthGuardForNoTokenGuard] },
  { path: 'back-code-page/:id', component: VerifyByBackupCodesComponent, canActivate: [AuthGuardForNoTokenGuard] },
  {   path: 'user-verification-check/:id',  component: UserVerificationCheckComponent, canActivate: [AuthGuardForNoTokenGuard] },

  { path: 'forgotPassword', component: ForgotPasswordComponent, canActivate: [AuthGuardForNoTokenGuard] },
  { path: 'resetpassword/:token', component: ResetPasswordComponent, canActivate: [AuthGuardForNoTokenGuard] },


  // {path: 'dashboard', component:DashboardComponent, canActivate:[AuthGuard]},

  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
      { path: 'profile', component: ProfileComponent },
      { path: '', component: DashboardCardsComponent },


      {
        path: 'district', component: DistrictComponent
      },
      {
        path: 'Add-district', component: AddDistrictComponent
      },

      {
        path: 'Edit-district/:id', component: EditDistrictComponent
      },

      {
        path: 'district-calender', component: DistrictCalenderComponent
      },
      {
        path: 'add-district-calender', component: AddDistrictCalenderComponent
      },

      {
        path: 'edit-district-calendar/:id', component: EditDistrictCalendarComponent
      },
      {
        path: "holidayCalendar/:id", component: HolidayCalendarComponent
      },
      {
        path: "add-holiday/:id", component: AddholidayComponent
      },
      {
        path: "edit-holiday/:id", component: EditHolidayComponent
      },
      {
        path: "schoolInfo", component: SchoolInformationViewComponent
      },

      {
        path: "add-school", component: AddSchoolComponent
      },

      {
        path: "edit-school/:id", component: EditSchoolComponent
      },
      {
        path: "ClassroomView", component: SchoolClassroomInformationComponent
      },
      {
        path: "add-classroom", component: AddClassroomComponent
      },
       {
        path: "editClassroom/:id", component: EditClassroomComponent
      },
        {
        path: "school-calendar/:id", component: SchoolCalendarInformationComponent
      },
       {
        path: "add-school-calendar/:id", component: AddSchoolCalendarComponent
      },

      {
        path: "edit-school-calendar/:id", component: EditSchoolCalendarComponent
      },
      {
        path: "admin", component: AdminComponent
      },

      {
        path:"add-admin",component:AddAdminComponent
      },

      {
        path:"edit-admin/:id",component:EditAdminComponent
      },

      {
        path:"teacher",component:TeacherComponent
      },
      {
        path:"add-teacher",component:AddTeacherComponent
      },
      {
        path:"edit-teacher/:id",component:EditTeacherComponent
      },
      {
        path:"student",component:StudentComponent
      },

      {
        path:"add-student",component:AddStudentComponent
      },
      {
        path:"edit-student/:id",component:EditStudentComponent
      }
    ]
  },
  // other routes...
];





@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
