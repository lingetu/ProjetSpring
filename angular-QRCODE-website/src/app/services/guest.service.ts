import { Guest } from '../shared/models/guest';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {

  // GUEST_CREATION_EVENT,
  GUEST_LOGIN_URL,
  GUEST_REGISTER_URL,


} from '../shared/constants/urls';

import { IEventCreation } from '../shared/interfaces/IEventCreation';
import { IGuestLogin } from '../shared/interfaces/IGuestLogin';


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
    return this.http.post<any>(url,guestLogin).pipe(
      tap({
        next: (guest) => {
          this.UserGuest.next(guest);
          this.guestObservable = this.UserGuest.asObservable();

          this.toastrService.success(`Bienvenu ${guest.nom} !`);
          ('Connexion Reussi'); // message to send in case of succes
          console.log(this.guestObservable);
        },

        error: (errorresponse) => {
          console.log(errorresponse);
          this.toastrService.error(errorresponse.error, 'Log Failed'); // message in failed case

        },
      })
    ); // to connect the backend with the front
  }


  registerGuest(guestLogin:any):Observable<any>{
    return this.http.post<Guest>(GUEST_REGISTER_URL ,guestLogin).pipe(

      tap({
        next: (guest) => {
          this.setGuestToLocalStorage(guest);
          this.UserGuest.next(guest);
          this.toastrService.success(
            `Bienvenu(e) ${guest.nom}`,
            'Inscription reussi !!'
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(
            errorResponse.error,
            'Inscription échouée !! '
          );
        },
      })
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
