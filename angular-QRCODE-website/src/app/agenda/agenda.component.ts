import { Component, OnInit } from '@angular/core';
import { CalendarModule,CalendarEvent, CalendarView } from 'angular-calendar';
import { startOfDay, endOfDay, subDays, addDays, addHours } from 'date-fns';
import { StudentService } from '../services/student.service';
import { GuestService } from '../services/guest.service';
import { Student } from '../shared/models/student';
@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})



export class AgendaComponent implements OnInit {
  view : CalendarView = CalendarView.Week;
  viewDate: Date = new Date();
  CalendarView = CalendarView;
  student:Student;

  events: CalendarEvent[] = [

      {
        title: 'Anniversaire de Marie',
        start: new Date('2024-05-23T08:00:00'),
        end: new Date('2024-05-23T10:00:00'),
        color: { primary: '#1e90ff', secondary: '#D1E8FF' },
        allDay: false,
        meta: { description: 'Fête d\'anniversaire de Marie.' }
      },
      {
        title: 'Réunion déquipe',
        start: new Date('2024-05-20T09:00:00'),
        end: new Date('2024-05-20T10:30:00'),
        color: { primary: '#FF5733', secondary: '#FFD1C1' },
        allDay: false,
        meta: { description: 'Réunion hebdomadaire pour discuter des objectifs de la semaine.' }
      },
      {
        title: 'Déjeuner avec John',
        start: new Date('2024-05-21T12:30:00'),
        end: new Date('2024-05-21T13:30:00'),
        color: { primary: '#33FF57', secondary: '#C1FFD1' },
        allDay: false,
        meta: { description: 'Rencontre informelle pour discuter des projets en cours.' }
      },
      {
        title: 'Cours de danse',
        start: new Date('2024-05-22T18:00:00'),
        end: new Date('2024-05-22T19:30:00'),
        color: { primary: '#FF33E6', secondary: '#FFC1F9' },
        allDay: false,
        meta: { description: 'Cours de danse pour apprendre de nouveaux mouvements.' }
      },
      {
        title: 'Entretien embauche',
        start: new Date('2024-05-24T10:00:00'),
        end: new Date('2024-05-24T11:00:00'),
        color: { primary: '#FF5733', secondary: '#FFD1C1' },
        allDay: false,
        meta: { description: 'Entretien avec un candidat pour un poste vacant.' }
      },
      {
        title: 'Présentation du projet',
        start: new Date('2024-05-25T14:00:00'),
        end: new Date('2024-05-25T16:00:00'),
        color: { primary: '#1e90ff', secondary: '#D1E8FF' },
        allDay: false,
        meta: { description: 'Présentation des progrès du projet au comité.' }
      },
      {
        title: 'Séance de méditation',
        start: new Date('2024-05-26T08:00:00'),
        end: new Date('2024-05-26T09:00:00'),
        color: { primary: '#33FF57', secondary: '#C1FFD1' },
        allDay: false,
        meta: { description: 'Séance de méditation pour commencer la journée avec calme.' }
      },
      {
        title: 'Dîner de famille',
        start: new Date('2024-05-27T19:00:00'),
        end: new Date('2024-05-27T21:00:00'),
        color: { primary: '#FF33E6', secondary: '#FFC1F9' },
        allDay: false,
        meta: { description: 'Dîner de famille pour célébrer un événement spécial.' }
      },
      {
        title: 'Formation en ligne',
        start: new Date('2024-05-28T10:00:00'),
        end: new Date('2024-05-28T12:00:00'),
        color: { primary: '#1e90ff', secondary: '#D1E8FF' },
        allDay: false,
        meta: { description: 'Session de formation en ligne sur les nouvelles technologies.' }
      },
      {
        title: 'Séance photo',
        start: new Date('2024-05-29T15:00:00'),
        end: new Date('2024-05-29T17:00:00'),
        color: { primary: '#FF5733', secondary: '#FFD1C1' },
        allDay: false,
        meta: { description: 'Séance photo pour un projet créatif.' }
      }
  ];

  constructor(private studentService: StudentService) { }


  newEvent: CalendarEvent = {
    start: new Date(),
    end: addHours(new Date(), 2),
    title: '',
    color: { primary: '#1e90ff', secondary: '#D1E8FF' },
    allDay: false,
    meta: { description: '' }
  };

  ngOnInit() {
  //méthode pour récupérer les événements de l'étudiant connecté depuis la base de données à travers le service StudentService
  this.studentService.studentObservable.subscribe((newStudent)=>{
    this.student = newStudent;

    this.studentService.loadEvent(this.student.id).subscribe((events)=>{
      this.events = events;
    }
    )
  })
  
 if(this.student.name == undefined){
   //Rediriger vers la page de connexion
   window.location.href = "/formLogin";
 }




  }

  // addEvent() {
  //   if (this.newEvent.title && this.newEvent.start) {
  //     const newId = this.events.length ? Math.max(...this.events.map(e => e.id as number)) + 1 : 1;
  //     this.events = [
  //       ...this.events,
  //       {
  //         ...this.newEvent,
  //         id: newId,
  //       }
  //     ];
  //     this.newEvent = {
  //       start: new Date(),
  //       end: addHours(new Date(), 2),
  //       title: '',
  //       color: { primary: '#1e90ff', secondary: '#D1E8FF' },
  //       allDay: false,
  //       meta: { description: '' }
  //     };
  //   }
  // }

  // deleteEvent(eventToDelete: CalendarEvent) {
  //   this.events = this.events.filter(event => event !== eventToDelete);
  // }

  // Methods to navigate weeks
  // previousWeek() {
  //   this.viewDate = subDays(this.viewDate, 7);
  // }

  // nextWeek() {
  //   this.viewDate = addDays(this.viewDate, 7);
  // }
}
