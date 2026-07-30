import { inject, Injectable, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { DataService } from './data-service';
import { environment } from '../../environments/environment';
import { Case } from '../models/case';


@Service()
export class CaseService extends DataService<Case, number> {

  override _http: HttpClient = inject(HttpClient);


  getResourceUrl(): string {
    return `${environment.baseUrl}/api/case`;
  }

  // Additional methods specific to CaseService can be added here  
  getByStatusAndDate(statusid: number) {
    return this._http.get<Case[]>(this.getResourceUrl()+ '/status/' + statusid.toString()).pipe(
      //retry(1),
      catchError(this.errorHandler)
    );
  }

}
