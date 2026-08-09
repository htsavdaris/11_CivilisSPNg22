import { Injectable, Inject, Service, inject } from '@angular/core';
import { HttpClient, HttpHeaders, httpResource, HttpResourceRef } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { DataService } from './data-service';
import { PersonAttributeView } from '../models/personattributeview';

@Injectable({
  providedIn: 'root'
})
export class PersonAttributeViewService extends DataService<PersonAttributeView, number> {
  override _http: HttpClient = inject(HttpClient);

  getResourceUrl(): string {
    return `${environment.baseUrl}/api/PersonAttributeView`;
  }

  getForPersonId(personid: number) {
    return this._http.get<PersonAttributeView[]>(this.getResourceUrl()+ '/personid/' + personid.toString()).pipe(
      //retry(1),
      catchError(this.errorHandler)
    );
  }

   getForPersonIdRx(personid: number): HttpResourceRef<PersonAttributeView[] | undefined> {
    return httpResource<PersonAttributeView[] | undefined>(() => ({
      url: this.getResourceUrl() +  + '/personid/' + personid,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
    }));

  }

  getForAttrId(attrid: number) {
    return this._http.get<PersonAttributeView[]>(this.getResourceUrl()+ '/attrid/' + attrid.toString()).pipe(
      //retry(1),
      catchError(this.errorHandler)
    );``
  }

  getForAttrIdRx(attrid: number) {
    return httpResource<PersonAttributeView[] | undefined>(() => ({
      url: this.getResourceUrl() +  + '/attrid/' + attrid,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
    }));
  }
  
}
