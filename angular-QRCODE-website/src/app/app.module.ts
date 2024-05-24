/*CORE MODULE */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/*MODULE*/
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QRCodeModule } from 'angularx-qrcode';

/*ROUTING*/
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

/*BACKEND*/
import { HttpClientModule } from '@angular/common/http';

/*COMPONENT */
import { AppComponent } from './app.component';

import { NullUrlComponent } from './null-url/null-url.component';

/*FORM*/
import { ReactiveFormsModule } from '@angular/forms';

import { LoginPageComponent } from './login-page/login-page.component';

import { RegistrationPageComponent } from './registration-page/registration-page.component';
// the following is added by Falilou :
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CreationEvenementComponent } from './creation-evenement/creation-evenement.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgendaComponent } from './agenda/agenda.component';


@NgModule({
  declarations: [
    AppComponent,
    NullUrlComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    CreationEvenementComponent,
    CreationEvenementComponent,
    AgendaComponent,
   ],


  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
    QRCodeModule,
    HttpClientModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),

      RouterModule.forChild([
        { path: '', redirectTo:'formLogin', pathMatch:'full'},
        { path: 'creationEvenement', component: CreationEvenementComponent},
        /*Home page quand on est déjà login affiche le profile avec nos informations*/
        /* Form à remplir pour obtenir son QRCODE quand on est extérieur à l'école */
        /**Form login si admin redirige vers page admin, si étudiant/invité redirige vers scanneur de qrcode/home(profile) */
        { path: 'formLogin', component: LoginPageComponent},
        { path: 'homeStudent', component: AgendaComponent},
        /**S'enregistrer avec son mail ou numéro étudiant */
        { path: 'formRegistration', component: RegistrationPageComponent},
        { path: '**', component: NullUrlComponent},
            ]),

      ToastrModule.forRoot({
        timeOut : 3000,
        positionClass :'toast-bottom-right',
        newestOnTop:false
      }),
        NgbModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
