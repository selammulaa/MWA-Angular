import { Component, OnInit } from '@angular/core';
import { AttendanceService } from './attendance.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public attendanceService:AttendanceService, private router : Router){

  }

  ngOnInit(): void {
    
  }

  logout():void {
    this.attendanceService.isLoggedIn = false;
    this.attendanceService.loggedInUser = new Object();
    this.attendanceService.isStudent = false;
    this.attendanceService.isTeacher = false;
    this.router.navigateByUrl("login");

  }
}
