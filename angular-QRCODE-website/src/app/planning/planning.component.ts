import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlanningService } from '../services/planning.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {
  guest: any;
  newEventForm: FormGroup;

  constructor(
    private planningService: PlanningService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state && navigation.extras.state['guest']) {
      this.guest = navigation.extras.state['guest'];
    }
  }

  ngOnInit() {
    // if (!this.guest || this.guest.dtype !== 'Enseignant') {
    //   this.router.navigate(['/formLogin']);
    // }

    this.newEventForm = this.formBuilder.group({
      agendaId: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      type: ['', Validators.required],
      typeEvenement: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.newEventForm.invalid) {
      return;
    }

    const event = {
      ...this.newEventForm.value,
      utilisateurId: this.guest.id
    };

    this.planningService.addPlanning(event).subscribe(response => {
      console.log("Event added successfully", response);
      this.router.navigate(['/agenda']);
    }, error => {
      console.error("Error adding event", error);
    });
  }
}
