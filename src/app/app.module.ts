import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, NgForm } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { MessagingComponent } from './messaging/messaging.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { FacultyHomeComponent } from './faculty-home/faculty-home.component';
import { StudentListComponent } from './student-list/student-list.component';
import { RegisterCourseComponent } from './register-course/register-course.component';

const routes: Routes = [
  {path: '', redirectTo: "/login", pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'student/profile/:id', component: StudentProfileComponent},
  {path: 'home', component: StudentHomeComponent},
  {path: 'home/faculty', component: FacultyHomeComponent},
  {path: 'faculty/students', component: StudentListComponent},
  {path: 'register', component: RegisterCourseComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentProfileComponent,
    MessagingComponent,
    StudentHomeComponent,
    FacultyHomeComponent,
    StudentListComponent,
    RegisterCourseComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
