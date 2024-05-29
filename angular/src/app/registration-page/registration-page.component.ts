import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GuestService } from '../services/guest.service';
import { StudentService } from '../services/student.service';
import { PasswordsMatchValidator } from '../shared/validators/passwords_match_validator';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

  rightpanelactive(elem: HTMLElement) {
    elem.className = 'container right-panel-active';
  }
  
  leftpanelactive(elem: HTMLElement) {
    elem.className = 'container';
  }

  DataGuestRegisterForm !: FormGroup;
  isSubmitted = false;
  returnUrl = '';

  constructor(
    private formBuilder: FormBuilder,
    private guestService: GuestService,
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.DataGuestRegisterForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      role: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      specialisation: [''], // Only for Enseignant
      matricule: [''] // Only for Etudiant
    }, {
      validators: PasswordsMatchValidator('password', 'confirmPassword')
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  get fcGuest() {
    return this.DataGuestRegisterForm.controls;
  }

  submitRegistrationGuest() {
    this.isSubmitted = true;
    
    if (this.DataGuestRegisterForm.invalid) {
      console.log("Form is invalid");
      return;
    }

    const fv = this.DataGuestRegisterForm.value;

    let user: any = {
      nom: fv.name,
      email: fv.email,
      motDePasse: fv.password,
    };

    if (fv.role === 'etudiant') {
      user = {
        ...user,
        dtype: 'etudiant',
        matricule: fv.matricule
      };
    } else if (fv.role === 'enseignant') {
      user = {
        ...user,
        dtype: 'enseignant',
        specialisation: fv.specialisation
      };
    }

    console.log(user);

    this.guestService.registerGuest(user).subscribe(_ => {
      this.router.navigateByUrl(this.returnUrl);
    });
  }
}
