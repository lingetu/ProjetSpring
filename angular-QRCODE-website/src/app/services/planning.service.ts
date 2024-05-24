import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {LOAD_EVENT } from '../shared/constants/urls';


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


  getUser(id:any): Observable<any> {
    return this.http.get(LOAD_EVENT,httpOptions);
  }

  getEvent(id:any): Observable<any> {
    return this.http.get(LOAD_EVENT,httpOptions);
  }
}




