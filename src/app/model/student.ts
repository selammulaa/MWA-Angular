import { Course } from "./course";

export class Student{

    password: string;
    repeatPassword: string;
    studentId: string;
    firstName: string;
    lastName: string;
    picture: File; 
    _id: string;
    course: Course[];
    

}