import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../attendance.service';
import { User } from '../model/user';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  loginError: boolean;

  constructor(
    private attendanceService: AttendanceService,
    private router: Router) { }

  ngOnInit(): void {
  }

  login():void {
    console.log(this.user);
    this.attendanceService.login(this.user)
      .then(user => {
        console.log(user);
        if(this.attendanceService.isStudent)
          this.router.navigateByUrl('home');
        else 
          this.router.navigateByUrl('home/faculty');

      }).catch(error => {
        console.log(error);
        this.loginError = true;
      })
  }

  profile(){
    this.router.navigateByUrl('student/profile/0');
  }

}
