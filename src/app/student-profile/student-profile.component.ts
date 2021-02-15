import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from "@angular/router";


import { Student } from '../model/student';
import { AttendanceService } from '../attendance.service';
import { MessageService } from '../message.service';
import { Course } from '../model/course';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {

  student: Student = new Student();
  imgSrc : any = "assets/images/black.jpg";
  isNew: boolean;
  isTeacher: boolean;

  allCourses: Course[];

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private attendanceService: AttendanceService,
    private messagingService: MessageService) { }

  ngOnInit(): void {
    this.checkProfile();
  }

  getCourses():void {
    this.attendanceService.getCourses()
        .then(courses => {
          this.allCourses = courses;
          console.log(this.allCourses);
        }).catch(err => {
          console.log(err);
        })
  }

  checkProfile(){
    const id = this.route.snapshot.paramMap.get('id');
    this.isTeacher = this.attendanceService.isTeacher;

    if(id === '0'){
      this.isNew = true;
    }else {
      this.isNew = false;
      this.getStudent(id);
      this.getCourses();
      
    }
  }

  getStudent(id: string){
    this.attendanceService.studentGetOne(id).then(student => {
      this.student = student;
      console.log(this.student);
    }).catch(err => {
      console.log(err);
    })
  }

  createProfile() : void {
    console.log(this.student);

    if(this.student.password !== this.student.repeatPassword){
      this.messagingService.showErrorMessage("Password and repeat password must be the same");
      return;
    }else {
      this.attendanceService.createProfile(this.student, true).then(student => {
        this.messagingService.showSuccessMessage("Student profile is created successfully. Now you can login using this profile");
        this.student = new Student();
        console.log(student);
      }).catch(error => {
        this.messagingService.showErrorMessage("Error Occured. Please Try Again.");
        this.student = new Student();
        console.log(error);
      })
    } 
    
  }

  back(){
    this.location.back();
  }

  update() : void{
    this.attendanceService.studentUpdateOne(this.student)
          .then((student) => {
            this.messagingService.showSuccessMessage("Profile Updated Successfully");
            this.student = student;

          }).catch(err => {
            this.messagingService.showErrorMessage("Error while updating profile");
          })
  }

  remove() : void{
    this.attendanceService.studentRemoveOne(this.student._id)
        .then(() => {
          this.messagingService.showSuccessMessage("Successfully Deleted Profile");
          this.attendanceService.isLoggedIn = false;
          this.attendanceService.loggedInUser = null;
          this.router.navigateByUrl('login');
        }).catch(err => {
          this.messagingService.showErrorMessage("Error while deleteing profile");
        });
  }

  add(){
    this.attendanceService.createProfile(this.student, false).then(student => {
      this.messagingService.showSuccessMessage("Student is added successfully.");
      // this.router.navigateByUrl("student/profile/"+ student._id);
      this.student = new Student();
    }).catch(error => {
      this.messagingService.showErrorMessage("Error Occured. Please Try Again.");
      this.student = new Student();
      console.log(error);
    })
  }

  register(course: Course){
    course.studentRegistrationCode = course.registrationCode;
    course.studentId = this.student._id;
    this.attendanceService.registerCourse(course)
        .then(course => {
          console.log(course);
          this.getStudent(this.student._id);
        }).catch(err => {
          console.log(err);
        })
    
  }

  removeCourse(course: Course){
    this.attendanceService.removeCourse(this.student._id, course._id)
          .then(() => {
            this.getStudent(this.student._id);

          }).catch(err => {
            console.log(err);
          })
      ;
  }

  picture(event){
    // console.log(event);
    // const file: File = event.files[0],
    //       reader: FileReader = new FileReader(),
    //        that = this; // *** WORTH NOTING...

    //   reader.addEventListener('loadend', function () {
    //     console.log('the resulting base64 string = ', reader.result);
    //     that.imgSrc = reader.result;
    //   }, false);

    //   if (file) {
    //     reader.readAsDataURL(file);
    //   }

    //   console.log('does the blob get updated to currentimage?',
    //                this.imgSrc); // THIS RETURNS THE OLD IMAGE PATH***

  }

}
