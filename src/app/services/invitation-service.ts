import { inject, Injectable, Service } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { DataService } from './data-service';
import { environment } from '../../environments/environment';

import { Invitation } from '../models/invitation';

@Injectable({
  providedIn: 'root'
})
export class InvitationService extends DataService<Invitation, number> {

  override readonly _http: HttpClient = inject(HttpClient);

  getResourceUrl(): string {
    return `${environment.baseUrl}/api/Invitation`;
  }
  
}
