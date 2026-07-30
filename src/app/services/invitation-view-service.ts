import { inject, Injectable, Service } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { DataService } from './data-service';
import { environment } from '../../environments/environment';

import { InvitationView } from '../models/invitationview';
@Injectable({
  providedIn: 'root'
})

export class InvitationViewService extends DataService<InvitationView, number> {

  override readonly _http: HttpClient = inject(HttpClient);

  getResourceUrl(): string {
    return `${environment.baseUrl}/api/InvitationView`;
  }
  
}
