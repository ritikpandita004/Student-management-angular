import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']

})

export class SidebarComponent implements OnInit {
  schoolCalendarInfoAll: string = 'all'
  id: any;


  constructor(private Route: Router) { }

  ngOnInit(): void {
  }

  District() {
    this.Route.navigate(['dashboard/district'])
  }

  districtcalender() {
    this.Route.navigate(['dashboard/district-calender'])
  }


  schoolInfo() {
    this.Route.navigate(['dashboard/schoolInfo'])
  }

  schoolCalendarInfo() {
    this.id = this.schoolCalendarInfoAll
    this.Route.navigate(['dashboard/school-calendar', this.id])
  }


  admin() {
    this.Route.navigate(['dashboard/admin'])
  }

  teacher() {
    this.Route.navigate(['dashboard/teacher'])
  }

  student() {
    this.Route.navigate(['dashboard/student'])
  }
}
