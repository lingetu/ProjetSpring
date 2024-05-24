import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { STUDENT_LOGIN_URL, STUDENT_REGISTER_URL } from '../shared/constants/urls';
import { IStudentLogin } from '../shared/interfaces/IStudentLogin';
import { IStudentRegister } from '../shared/interfaces/IStudentRegister';
import { Student } from '../shared/models/student';

const STUDENT_KEY = 'Student'; // We can modify this key when it's needed

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  
 // private UserStudent = new BehaviorSubject<Student>(this.getStudentFromLocalStorage());
 private UserStudent = new BehaviorSubject<Student>(new Student());

  public studentObservable:Observable<Student>;


  constructor(private http:HttpClient , private toastrService:ToastrService) {
   this.studentObservable = this.UserStudent.asObservable();
  }


  // Here we define the Login methode by using an Interface (the IStudentLogin interface )

  login(studentLogin:IStudentLogin):Observable<Student>{
    return this.http.post<Student>(STUDENT_LOGIN_URL ,studentLogin).pipe(

      tap({
        next:(student)=>{
        ///let newStudent=student[0];

       // this.setStudentToLocalStorage(newStudent)   // to save the session  

          this.UserStudent.next(student);
          this.toastrService.success(
            `Bienvenu ${student.name} !`);
            'Connexion Reussi'                   // message to send in case of succes 
        },
           // to save the session



        error:(errorresponse)=>{
          this.toastrService.error(errorresponse.error, 'Login Failed');  // message in failed case
        }


      })


    ); // to connect the backend with the front

  }



// 2 methodes to save the connexion once a student has logged:

private setStudentToLocalStorage(student:Student){
  localStorage.setItem(STUDENT_KEY, JSON.stringify(student));

}

private getStudentFromLocalStorage():Student{
  const studentJson = localStorage.getItem(STUDENT_KEY);
  if(studentJson) return JSON.parse(studentJson) as Student;
  return new Student();
}




register(studentRegister:IStudentRegister): Observable<Student>{
   console.log("fonction register");
  return this.http.post<Student>(STUDENT_REGISTER_URL,studentRegister).pipe(
    tap({
      next: (student ) =>{
        this.setStudentToLocalStorage(student);
        this.UserStudent.next(student);
        this.toastrService.success(
          `Bienvenu(e) ${student.name}`,
          'Inscription reussi !!'
        )
      },
      error: (errorResponse)=>{
        this.toastrService.error(errorResponse.error ,
          'Inscription échouée !! ')
      }
    })
  )
}









}
