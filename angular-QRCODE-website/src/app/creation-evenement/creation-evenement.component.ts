import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GuestService } from '../services/guest.service';
import { Guest } from './../shared/models/guest';


@Component({
  selector: 'app-creation-evenement',
  templateUrl: './creation-evenement.component.html',
  styleUrls: ['./creation-evenement.component.css'],
})
export class CreationEvenementComponent implements OnInit {
  guest!: Guest;
  DataFormCreationEvent!: FormGroup;
  isSubmitted = false;
  returnUrlGuest = '/homeGuest';
  payLoad: any;

  constructor(
    private guestService: GuestService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.guestService.guestObservable.subscribe((newGuest) => {
      this.guest = newGuest;
    });

    if (this.guest.name == undefined) {
      //Rediriger vers la page de connexion
      window.location.href = '/formLogin';
    }

    this.DataFormCreationEvent = this.formBuilder.group({
      eventName: ['', Validators.required],
      eventDate: ['', Validators.required],
      eventTime: ['', Validators.required],
      eventHour: ['', Validators.required],
    });

    this.returnUrlGuest = this.returnUrlGuest;
  }

  get fcEvent() {
    return this.DataFormCreationEvent.controls;
  }

  submitCreationEvent() {
    this.isSubmitted = true;
    if (this.DataFormCreationEvent.invalid) {
      return;
    }




    this.guestService
      .creationEvent(
        { guestID: this.guest.id },
        {
          name: this.fcEvent['eventName'].value,
          date: this.fcEvent['eventDate'].value,
          time: this.fcEvent['eventTime'].value,
          hour: this.fcEvent['eventHour'].value,
          presentList: [],
        }
      )
      .subscribe(() => {
        this.router.navigate([this.returnUrlGuest]);
      });
  }
}
