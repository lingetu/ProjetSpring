import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GuestService } from '../services/guest.service';
import { StudentService } from '../services/student.service';
import { IGuestRegister } from '../shared/interfaces/IGuestRegister';
import { IStudentRegister } from '../shared/interfaces/IStudentRegister';
import { PasswordsMatchValidator } from '../shared/validators/passwords_match_validator';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent  {

  rightpanelactive(elem: HTMLElement) {
    elem.className = 'container right-panel-active';

  }
  leftpanelactive(elem: HTMLElement) {
    elem.className = 'container';
  }

  DataForm: FormGroup = new FormGroup({});
  payLoad: any;

 PreviewData()
    {
         this.payLoad = JSON.stringify(this.DataForm.value);
         console.log(this.payLoad);
    }


    DataStudentRegisterForm !: FormGroup;
    DataGuestRegisterForm !: FormGroup;
    isSubmitted = false;
    returnUrl = '';   // returnUrl = '/home';

    constructor(private formBuilder: FormBuilder ,

      private studentService :StudentService ,
      private guestService :GuestService ,
      private activatedRoute : ActivatedRoute,
      private router: Router) {}

      ngOnInit(): void{
        this.DataStudentRegisterForm = this.formBuilder.group({
          numberStudent:['', [Validators.required , Validators.minLength(8)]],
          name:['', [Validators.required,Validators.minLength(3)]],
          password:['', Validators.required],
          confirmPassword:['',Validators.required]
        },
        {

          validators: PasswordsMatchValidator('password', 'confirmPassword')
        });

        this.DataGuestRegisterForm = this.formBuilder.group({

          name :['',[ Validators.required , Validators.minLength(2)]],
          company :['',[Validators.required ,Validators.minLength(1)]],
          email:['', [Validators.required ,Validators.email]],
          password:['', [Validators.required]],
          confirmPassword:['',[Validators.required]]
        },{

          validators: PasswordsMatchValidator('password', 'confirmPassword'),


        });

        this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
      }





/************************************* STUDENT REGISTRATION ****************************************  */


get fcStudent (){
  return this.DataStudentRegisterForm.controls;
}




submitRegistrationStudent(){


  this.isSubmitted = true;
  console.log(this.DataStudentRegisterForm.value['password']);
  console.log(this.DataStudentRegisterForm.value['confirmPassword']);
  if(this.DataStudentRegisterForm.invalid) {
    console.log("ok");
    // Log des erreurs spécifiques
    if (this.fcStudent['name'].errors) {
      console.log('Erreur dans le champ "name" :', this.fcStudent['name'].errors);
   }
   if (this.fcStudent['numberStudent'].errors) {
      console.log('Erreur dans le champ "studentNumber" :', this.fcStudent['numberStudent'].errors);
   }
   if (this.fcStudent['password'].errors) {
    console.log('Erreur dans le champ "password" :', this.fcStudent['password'].errors);
 }
 if (this.fcStudent['confirmPassword'].errors) {
  console.log('Erreur dans le champ "confirmPassword" :', this.fcStudent['confirmPassword'].errors);
}


   return;
  }

  const fv = this.DataStudentRegisterForm.value;

  const student : IStudentRegister ={
    name : fv.name,
    numberStudent : fv.numberStudent,
    password : fv.password,
    confirmPassword : fv.confirmPassword
  };


  this.studentService.register(student).subscribe(_ =>{
    this.router.navigateByUrl(this.returnUrl);
  });



}


/******************************* GUEST REGISTRATION ************************************ */




get fcGuest (){
  return this.DataGuestRegisterForm.controls;
}

//Guest registration methode

submitRegistrationGuest(){


  this.isSubmitted = true;
  //console.log(this.DataStudentRegisterForm.value['password']);
  //console.log(this.DataStudentRegisterForm.value['confirmPassword']);
  if(this.DataGuestRegisterForm.invalid) {
    console.log("ok");
    // Log des erreurs spécifiques
    if (this.fcGuest['name'].errors) {
      console.log('Erreur dans le champ "name" :', this.fcGuest['name'].errors);
   }
   if (this.fcGuest['email'].errors) {
      console.log('Erreur dans le champ "email" :', this.fcGuest['email'].errors);
   }
   if (this.fcGuest['password'].errors) {
    console.log('Erreur dans le champ "password" :', this.fcGuest['password'].errors);
 }
 if (this.fcGuest['confirmPassword'].errors) {
  console.log('Erreur dans le champ "confirmPassword" :', this.fcGuest['confirmPassword'].errors);
}


   return;
  }

  const fv = this.DataGuestRegisterForm.value;

  const guest : IGuestRegister ={
    name : fv.name,
    company : fv.company,
    adresse: fv.adresse,
    email : fv.email,
    password : fv.password,
    confirmPassword : fv.confirmPassword
  };


  this.guestService.registerGuest(guest).subscribe(_ =>{
    this.router.navigateByUrl(this.returnUrl);
  });



}

}

