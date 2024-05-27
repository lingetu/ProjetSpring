import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { subDays, addDays } from 'date-fns';
import { GuestService } from '../services/guest.service';
import { PlanningService } from '../services/planning.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  view: CalendarView = CalendarView.Week;
  viewDate: Date = new Date();
  CalendarView = CalendarView;
  guest: any;
  selectedEvent: CalendarEvent | null = null;
  events: CalendarEvent[] = [];

  constructor(
    private guestService: GuestService,
    private planningService: PlanningService,
    private router: Router
  ) {}

  ngOnInit() {
    this.guestService.guestObservable.subscribe((newGuest) => {
      this.guest = newGuest;
      console.log("Guest: ", this.guest);

      this.planningService.getEvent(`http://localhost:8080/utilisateurs/${this.guest.id}/plannings`).subscribe((data) => {
        console.log("Events Data: ", data);
        this.events = data.map(event => this.transformEvent(event));
        console.log("Transformed Events: ", this.events);
      });
    });

    if (!this.guest || !this.guest.nom) {
      window.location.href = "/formLogin";
    }
  }

  transformEvent(event: any): CalendarEvent {
    return {
      title: event.typeEvenement,
      start: new Date(event.dateDebut),
      end: new Date(event.dateFin),
      color: this.getColor(event.type),
      allDay: false,
      meta: { description: event.type },
    };
  }

  getColor(type: string) {
    switch (type) {
      case 'Cours':
        return { primary: '#FF5733', secondary: '#FFD1C1' };
      case 'Spécifique':
        return { primary: '#33FF57', secondary: '#C1FFD1' };
      default:
        return { primary: '#000000', secondary: '#FFFFFF' };
    }
  }

  previousWeek() {
    this.viewDate = subDays(this.viewDate, 7);
    console.log("Previous Week: ", this.viewDate);
  }

  nextWeek() {
    this.viewDate = addDays(this.viewDate, 7);
    console.log("Next Week: ", this.viewDate);
  }

  handleEventClick(event: CalendarEvent) {
    this.selectedEvent = event;
    console.log("Selected Event: ", this.selectedEvent);
  }

  closeEventDetails() {
    this.selectedEvent = null;
  }

  redirectToPlanning() {
    this.router.navigate(['/planning'], { state: { guest: this.guest } });
  }
}
