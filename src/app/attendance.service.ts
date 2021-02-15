import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './model/user';
import { Student } from './model/student';
import { Course } from './model/course';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  private apiBaseUrl = "http://localhost:3000";
  isLoggedIn: boolean = true;
  isStudent: boolean = false;
  isTeacher: boolean = true;
  loggedInUser: any = new Object();


  constructor(private http: HttpClient) { 
    this.loggedInUser.user = new Object();
    if(this.isStudent)
      this.loggedInUser.user.username = "Selam Student";
    else 
      this.loggedInUser.user.username = "Professor Teacher";

  }

  public login(user: User): Promise<User>{
    const url: string = this.apiBaseUrl + "/login";
    return this.http.post(url, user)
                    .toPromise()
                    .then(response => {
                      // response as User;
                      this.loggedInUser = response as any;
                      this.isLoggedIn = true;
                      this.isStudent = this.loggedInUser.user.role === "student"? true : false;
                      this.isTeacher = this.loggedInUser.user.role === "faculty"? true : false;
                      console.log(this.loggedInUser);
                    }).catch(this.handleErrors);

  }

  public createProfile(student: Student, isStudent: boolean) : Promise<Student>{
    
    let url: string;

    if(isStudent){
      url = this.apiBaseUrl + "/students?student=true";
    }else {
      url = this.apiBaseUrl + "/students";
    }

    return this.http.post(url, student)
      .toPromise().then(response => response as Student).catch(this.handleErrors);

  }

  public studentGetOne(id: String): Promise<Student>{
    const url: string = this.apiBaseUrl + "/students/"+id;

    return this.http.get(url)
              .toPromise()
              .then(response => response as Student)
              .catch(this.handleErrors);

  }

  public studentUpdateOne(student: Student): Promise<Student>{
    const url: string = this.apiBaseUrl + "/students/"+student._id;

    return this.http.put(url, student)
               .toPromise()
               .then(response => response as Student)
               .catch(this.handleErrors);

  }

  public studentRemoveOne(id: String): Promise<Student>{
    const url: string = this.apiBaseUrl + "/students/"+id;

    return this.http.delete(url)
               .toPromise()
               .then()
               .catch(this.handleErrors);

  }

  public studentGetAll(): Promise<Student[]>{
    const url: string = this.apiBaseUrl + "/students/";

    return this.http.get(url)
               .toPromise()
               .then(response => response as Student[])
               .catch(this.handleErrors);

  }

  public searchStudents(searchString: String): Promise<Student[]>{
    const url: string = this.apiBaseUrl + "/students?search=" + searchString;

    return this.http.get(url)
               .toPromise()
               .then(response => response as Student[])
               .catch(this.handleErrors);

  }

  public getCourses(): Promise<Course[]> {
    const url: string = this.apiBaseUrl + "/courses";

    return this.http.get(url)
    .toPromise()
    .then(response => response as Course[])
    .catch(this.handleErrors);
  }

  public registerCourse(course: Course): Promise<Course> {
    const url: string = this.apiBaseUrl + "/students/" + course.studentId + "/courses";

    return this.http.post(url, course)
      .toPromise()
      .then(response => response as Course)
      .catch(this.handleErrors);

  }

  public removeCourse(studentId: string, courseId: string){
    const url: string = this.apiBaseUrl + "/students/" + studentId + "/courses/" + courseId;

    return this.http.delete(url)
      .toPromise()
      .then(() => {

      })
      .catch(this.handleErrors)

  }

  private handleErrors(error: any):Promise<any>{
    console.log("");
    return Promise.reject(error.message || error);
  }
}
