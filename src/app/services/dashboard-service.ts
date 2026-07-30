import { inject, Injectable, Service } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Dashboard } from '../models/dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  _http: HttpClient = inject(HttpClient);

  generatedash(personid: number): Observable<number> {
    var url = `${environment.baseUrl}/api/Dashboard/generatedash`+ "/" + personid;
    return this._http.get<number>(url).pipe(
      //retry(1),
      catchError(this.errorHandler)
    );
  }

  getdashforperson(personid: number): Observable<Dashboard> {
    var url = `${environment.baseUrl}/api/Dashboard/getdashforperson` + "/" + personid;
    return this._http.get<Dashboard>(url).pipe(
      //retry(1),
      catchError(this.errorHandler)
    );
  }

  getOpenCases(): Observable<number> {
    var url = `${environment.baseUrl}/api/Dashboard/opencases`;
    return this._http.get<number>(url).pipe(
      //retry(1),
      catchError(this.errorHandler)
    );
  }


  getCases(): Observable<number> {
    var url = `${environment.baseUrl}/api/Dashboard/cases`;
    return this._http.get<number>(url).pipe(
      //retry(1),
      catchError(this.errorHandler)
    );
  }

  getPendingInvitations(): Observable<number> {
    var url = `${environment.baseUrl}/api/Dashboard/pendinginvitations`;
    return this._http.get<number>(url).pipe(
      //retry(1),
      catchError(this.errorHandler)
    );
  }

  getInvitations(): Observable<number> {
    var url = `${environment.baseUrl}/api/Dashboard/invitations`;
    return this._http.get<number>(url).pipe(
      //retry(1),
      catchError(this.errorHandler)
    );
  }

  getFutureInvitations(): Observable<number> {
    var url = `${environment.baseUrl}/Dashboard/futureinvitations`;
    return this._http.get<number>(url).pipe(
      //retry(1),
      catchError(this.errorHandler)
    );
  }


  errorHandler(error:any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
        errorMessage = error.error.message;
    } else {
      // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }        
    return throwError(errorMessage);
  }

}
