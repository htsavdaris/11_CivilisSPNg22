import { inject, Injectable, Service } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { DataService } from './data-service';
import { environment } from '../../environments/environment';

import { EntityView } from '../models/entityview';

@Injectable({
  providedIn: 'root'
})
export class EntityViewService extends DataService<EntityView, number> {

  override readonly _http: HttpClient = inject(HttpClient);

  getResourceUrl(): string {
    return `${environment.baseUrl}/api/EntityView`;
  }

 

  // Additional methods specific to EntityViewService can be added here
  
}
