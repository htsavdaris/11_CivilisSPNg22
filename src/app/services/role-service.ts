import { Injectable, Inject, Service, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { DataService } from './data-service';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root',
})

export class RoleService extends DataService<Role, number> {
  
  override _http: HttpClient = inject(HttpClient);
  
  getResourceUrl(): string {
    return `${environment.baseUrl}/api/role`;
  }

}
