import { Injectable, Inject, Service, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { DataService } from './data-service';

import { EklogikiDomi } from '../models/eklogiki-domi';

@Injectable({
  providedIn: 'root'
})

export class EklogikiDomiService extends DataService<EklogikiDomi, string> {
  
  override _http: HttpClient = inject(HttpClient);

  getResourceUrl(): string {
    return `${environment.baseUrl}/api/eklogikidomi`;
  }

   getListofType(id: number ): Observable<EklogikiDomi[]> {
      return this._http.get<EklogikiDomi[]>(this.getResourceUrl() + "type/" +id ).pipe(
        //retry(1),
        catchError(this.errorHandler)
      );
    }


}
