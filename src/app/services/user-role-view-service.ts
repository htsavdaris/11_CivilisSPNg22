import { Injectable, Inject, Service, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { DataService } from './data-service';

import { vwUserRole } from '../models/vwuserrole';

@Injectable({
  providedIn: 'root'
})
export class UserRoleViewService extends DataService<vwUserRole, number>{

  override _http: HttpClient = inject(HttpClient);
  
  getResourceUrl(): string {
    return `${environment.baseUrl}/api/UserRoleView`;
  }

  getForUserId(userid: number) {
      return this._http.get<vwUserRole[]>(this.getResourceUrl()+ '/user/' + userid.toString()).pipe(
        //retry(1),
        catchError(this.errorHandler)
      );
    }
  
}
