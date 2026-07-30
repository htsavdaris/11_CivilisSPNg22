import { Injectable, Inject, Service, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { DataService } from './data-service';
import { PersonAttribute } from '../models/personattribute';

@Injectable({
  providedIn: 'root'
})
export class PersonAttributeService extends DataService<PersonAttribute, number> {
   override _http: HttpClient = inject(HttpClient);

  getResourceUrl(): string {
    return `${environment.baseUrl}/api/PersonAttribute`;
  }
  
}
