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
  agendaId: number | null = null;

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
      color: this.getColor(),
      allDay: false,
      meta: { description: event.type },
    };
  }

   getColor() {
    // Fonction pour générer une couleur hexadécimale aléatoire
    function getRandomHexColor() {
      return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    }

    return {
      primary: getRandomHexColor(),
      secondary: getRandomHexColor()
    };
  }
  getagenda() {
    this.planningService.getEventbyId(`http://localhost:8080/agendas/${this.agendaId}/plannings`).subscribe((data) => {
      console.log("Events Data: ", data);
      this.events = data.map(event => this.transformEvent(event));
      console.log("Transformed Events: ", this.events);
    }
  );
  }
  previousWeek() {
    this.viewDate = subDays(this.viewDate, 7);
  }

  nextWeek() {
    this.viewDate = addDays(this.viewDate, 7);
  }

  handleEventClick(event: CalendarEvent) {
    this.selectedEvent = event;
  }

  closeEventDetails() {
    this.selectedEvent = null;
  }

  redirectToPlanning() {
    this.router.navigate(['/planning'], { state: { guest: this.guest } });
  }
  onAgendaChange(): void {
    this.loadEvents();
  }

  loadEvents(): void {
this.getagenda();
  }
}
