import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {LOAD_EVENT,BASE_URL } from '../shared/constants/urls';


const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
    }
  )
};

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

 

  constructor(private http: HttpClient) { }

  getEvent(url:any): Observable<any> {
    return this.http.get(url,httpOptions);
  }

  addEvent(event: any): Observable<any> {
    return this.http.post(LOAD_EVENT, event, httpOptions);
  }

  addPlanning(planning: any): Observable<any> {
    console.log("Planning to add: ", planning);
    return this.http.post<any>(`${BASE_URL}/plannings`, planning);
  }
  getEventbyId(url:any): Observable<any> {
    return this.http.get(url,httpOptions);
  }
}




