import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private Route: Router) { }

  ngOnInit(): void {

  }

  UpdateProfile() {

    this.Route.navigate(['/dashboard/profile'])
  }
  logout() {
    sessionStorage.clear();
    this.Route.navigate([''])
  }


}
