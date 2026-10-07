import { Injectable, Inject, Service, inject, Signal } from '@angular/core';
import { HttpClient, HttpHeaders, httpResource } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { DataService } from './data-service';
import { Person } from '../models/person';
import { vwPersonAttrArr } from '../models/vwpersonattrarr';
import { Searchperson1 } from '../models/searchperson1';
import { Searchpersonresults } from '../models/searchpersonresults';
@Injectable({
  providedIn: 'root'
})
export class PersonService extends DataService<Person, number> {
   override _http: HttpClient = inject(HttpClient);

  getResourceUrl(): string {
    return `${environment.baseUrl}/api/person`;
  }

   searchParam1(searchPerson : Searchperson1): Observable<Person[]> {
    return this._http.post<Person[]>(this.getResourceUrl() + "/search1" , searchPerson).pipe(
      //retry(1),
      catchError(this.errorHandler)
    );
  }

  //This is a parameter search on the view vwpersonattributeall
  searchParam2(searchPerson : Searchperson1): Observable<Searchpersonresults[]> {
    return this._http.post<Searchpersonresults[]>(this.getResourceUrl() + "/search2" , searchPerson).pipe(
      //retry(1),
      catchError(this.errorHandler)
    );
  }

   // Factory — component supplies reactive params, service owns URL/typing
  createPersonResource(personid: Signal<string | undefined>) {  
    return httpResource<Person>(() =>
      personid() ? `${environment.baseUrl}/api/person/${personid()}` : undefined
    );
  }
  
}
