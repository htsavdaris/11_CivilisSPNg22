import { inject, Injectable , Service} from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { DataService } from './data-service';
import { environment } from '../../environments/environment';


import { Casetype } from '../models/casetype';

@Injectable({
  providedIn: 'root'
})
export class CaseTypeService extends DataService<Casetype, number> {

   override _http: HttpClient = inject(HttpClient);

  getResourceUrl(): string {
    return `${environment.baseUrl}/api/CaseType`;
  }
  
}
