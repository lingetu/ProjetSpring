import { Guest } from '../shared/models/guest';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {BASE_URL} from '../shared/constants/urls';


import { IEventCreation } from '../shared/interfaces/IEventCreation';
import { IGuestLogin } from '../shared/interfaces/IGuestLogin';

const GUEST_REGISTER_URL= `${BASE_URL}/utilisateurs`;

const GUEST_KEY = 'Guest'; // We can modify this key when it's needed


@Injectable({
  providedIn: 'root',
})

export class GuestService {
  private UserGuest = new BehaviorSubject<any>(null);
  public guestObservable: Observable<any>;
  constructor(private http: HttpClient, private toastrService: ToastrService) {
    this.guestObservable = this.UserGuest.asObservable();
  }



  // Here we define the Login methode by using an Interface (the IStudentLogin interface )

  login(guestLogin: any,url:any): Observable<any> {
    console.log(guestLogin);
    return this.http.post<any>(url,guestLogin).pipe(
      tap({
        next: (guest) => {
          this.UserGuest.next(guest);
          this.guestObservable = this.UserGuest.asObservable();
          ('Connexion Reussi'); // message to send in case of succes
        },

        error: (errorresponse) => {
          console.log(errorresponse);// message in failed case
        },
      })
    ); // to connect the backend with the front
  }


  registerGuest(guestLogin:any):Observable<any>{
    return this.http.post<Guest>(GUEST_REGISTER_URL ,guestLogin).pipe(
    ); // to connect the backend with the front
  }
  private setGuestToLocalStorage(guest: Guest) {
    localStorage.setItem(GUEST_KEY, JSON.stringify(guest));
  }







  // private getGuestFromLocalStorage(): Guest {
  //   const guestJson = localStorage.getItem(GUEST_KEY);
  //   if (guestJson) return JSON.parse(guestJson) as Guest;
  //   return new Guest();
  // }





// Edite profile





}
