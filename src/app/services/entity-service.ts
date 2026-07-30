import { inject, Injectable, Service } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { DataService } from './data-service';
import { environment } from '../../environments/environment';
import { Entity } from '../models/entity';
import { Searchentity1 } from '../models/searchentity1';

@Injectable({
  providedIn: 'root'
})
export class EntityService extends DataService<Entity, number> {

  override _http: HttpClient = inject(HttpClient);

  

  getResourceUrl(): string {
    return `${environment.baseUrl}/api/Entity`;
  }

  searchParam(searchEntity : Searchentity1): Observable<Entity[]> {
    return this._http.post<Entity[]>(this.getResourceUrl() + "/search1" , searchEntity).pipe(
      //retry(1),
      catchError(this.errorHandler)
    );
  }

  
  
}
