import { inject, Injectable, Service } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { DataService } from './data-service';
import { environment } from '../../environments/environment';

import { vwCase } from '../models/vwcase';
import { Searchcase1 } from '../models/searchcase1';

@Injectable({
  providedIn: 'root'
})
export class CaseViewService extends DataService<vwCase,number> {
  override _http: HttpClient = inject(HttpClient);
  
  getResourceUrl(): string {
    return `${environment.baseUrl}/api/caseview`;
  }


  getByStatus(statusid: number) {
    return this._http.get<vwCase[]>(this.getResourceUrl()+ '/status/' + statusid.toString()).pipe(
      //retry(1),
      catchError(this.errorHandler)
    );
  }

  getByManager(managerid: number) {
    return this._http.get<vwCase[]>(this.getResourceUrl()+ '/manager/' + managerid.toString()).pipe(
      //retry(1),
      catchError(this.errorHandler)
    );
  }

  getOpenAll() {
    return this._http.get<vwCase[]>(this.getResourceUrl()+ '/status/').pipe(
      //retry(1),
      catchError(this.errorHandler)
    );
  }

  searchCriteria2(pcase: Searchcase1): Observable<vwCase[]> {
    return this._http.post<vwCase[]>(this.getResourceUrl()+ '/search2', JSON.stringify(pcase), this.httpOptions)
    .pipe(
        catchError(error => {
        return throwError('Something went wrong!');
      })
    )
  }
  
}
