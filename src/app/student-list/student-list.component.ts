import { Component, OnInit, OnChanges } from '@angular/core';
import { AttendanceService } from '../attendance.service';
import { MessageService } from '../message.service';
import { Student } from '../model/student';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit, OnChanges {

  studentList: Student[] = [];
  searchString: String;

  constructor(
    private attendanceService: AttendanceService,
    private messagingService: MessageService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  ngOnChanges(): void {
    console.log("change");
  }

  getStudents() : void{
    this.attendanceService.studentGetAll()
          .then(response => {
            this.studentList = response;
            console.log(this.studentList);
          }).catch(err => {
            this.messagingService.showErrorMessage("Error Occured!!!");
          })
  }

  removeStudent(id: string){
    console.log(id);

    this.attendanceService.studentRemoveOne(id)
        .then(() => {
          this.messagingService.showSuccessMessage("Student with id: " + id + " has been successfully deleted");
          this.getStudents();
        })
        .catch(err => {
          console.log(err);
        })
  }

  search(){
    this.attendanceService.searchStudents(this.searchString)
      .then(students => {
        this.studentList = students;
      }).catch(err => {
        this.messagingService.showErrorMessage("Error Occured!!!");
      })
  }


}
