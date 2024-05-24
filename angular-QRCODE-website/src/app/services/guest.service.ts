import { Guest } from './../shared/models/guest';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {
     GUEST_CREATION_EVENT,
  GUEST_LOGIN_URL,
  GUEST_REGISTER_URL,
  GUEST_GET_GUEST_LIVE,
  GUEST_DELETE_EVENT,
  GUEST_EDITE_URL,
  GUEST_ADD_STUDENT_TO_EVENT

} from '../shared/constants/urls';

import { IEventCreation } from '../shared/interfaces/IEventCreation';
import { IGuestLogin } from '../shared/interfaces/IGuestLogin';


const GUEST_KEY = 'Guest'; // We can modify this key when it's needed

@Injectable({
  providedIn: 'root',
})
export class GuestService {
  private UserGuest = new BehaviorSubject<Guest>(new Guest());

  public guestObservable: Observable<Guest>;

  constructor(private http: HttpClient, private toastrService: ToastrService) {
    this.guestObservable = this.UserGuest.asObservable();
  }

  addStudentToEvent(idEvent: string,idGuest: string,idStudent: string,studentNumber:string): Observable<Guest> {
    let obj = {
      eventID: idEvent,
      guestID: idGuest,
      studentID: idStudent,
      studentNumber: studentNumber,
    };
    return this.http.post<Guest>(GUEST_ADD_STUDENT_TO_EVENT, obj).pipe(
      tap({
        next: (guest) => {
          this.toastrService.success(
            `AJouté avec succés !!`,
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(
            errorResponse.error,
            'Ajout échouée !! '
          );
        },
      })
    );
  }

  // Here we define the Login methode by using an Interface (the IStudentLogin interface )

  login(guestLogin: IGuestLogin): Observable<Guest> {
    return this.http.post<Guest>(GUEST_LOGIN_URL, guestLogin).pipe(
      tap({
        next: (guest) => {
          this.UserGuest.next(guest);
          this.toastrService.success(`Bienvenu ${guest.name} !`);
          ('Connexion Reussi'); // message to send in case of succes
        },

        error: (errorresponse) => {
          this.toastrService.error(errorresponse.error, 'Log Failed'); // message in failed case
        },
      })
    ); // to connect the backend with the front
  }


  registerGuest(guestLogin:IGuestLogin):Observable<Guest>{
    return this.http.post<Guest>(GUEST_REGISTER_URL ,guestLogin).pipe(

      tap({
        next: (guest) => {
          this.setGuestToLocalStorage(guest);
          this.UserGuest.next(guest);
          this.toastrService.success(
            `Bienvenu(e) ${guest.name}`,
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

  getGuestLive(guestId): Observable<Guest> {
    let objGuestId = {
      guestID: guestId,
    };

    return this.http.post<Guest>(GUEST_GET_GUEST_LIVE, objGuestId);
  }

  deleteEvent(eventId: string,Guest: Guest): Observable<Guest>{
    let obj= {
      guestID: Guest.id,
      eventID: eventId
    };

    return this.http.post<Guest>(GUEST_DELETE_EVENT, obj).pipe(

    tap({
      next: (obj) => {
        this.toastrService.success(`Evenement supprimé`);
         // message to send in case of succes
      },

      error: (errorresponse) => {
        this.toastrService.error(errorresponse.error, 'Failed'); // message in failed case
      },
    })
  );
}



  // private getGuestFromLocalStorage(): Guest {
  //   const guestJson = localStorage.getItem(GUEST_KEY);
  //   if (guestJson) return JSON.parse(guestJson) as Guest;
  //   return new Guest();
  // }





// Edite profile

saveProfileGuest(guestEdite):Observable<Guest>{

  console.log(guestEdite);
  return this.http.post<Guest>(GUEST_EDITE_URL ,guestEdite).pipe(

    tap({
      next: (guest) =>{
      //  this.setGuestToLocalStorage(guest);
        // this.UserGuest.next(guest);
        this.toastrService.success(
          ` ${guest.name}`,
          'Vos modifications sont bien sauvegardées!!'
        )
      },
       error: (errorResponse)=>{
        console.log(guestEdite);
        this.toastrService.error(errorResponse.error ,
          'Sauvegarde échouée!! ')

    }
  })
  )





}


  creationEvent(guestId, dataEvent: IEventCreation): Observable<Guest> {
    let objEventForCreation = {
      guestID: guestId,
      event: dataEvent,
    };
    console.log(objEventForCreation.event);
    return this.http
    .post<Guest>(GUEST_CREATION_EVENT, objEventForCreation)
      .pipe(
        tap({
          next: (event) => {
            this.toastrService.success(`Evenement ${event.name} !`);
            ('Créé avec succés'); // message to send in case of succes
          },

          error: (errorresponse) => {
            this.toastrService.error(errorresponse.error, 'Failed'); // message in failed case
          },
        })
      );
  }


}
