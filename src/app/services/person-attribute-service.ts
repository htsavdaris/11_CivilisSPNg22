import { Injectable,  inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DataService } from './data-service';
import { PersonAttribute } from '../models/personattribute';

@Injectable({
  providedIn: 'root'
})
export class PersonAttributeService extends DataService<PersonAttribute, number> {
   public override _http: HttpClient = inject(HttpClient);

  getResourceUrl(): string {
    return `${environment.baseUrl}/api/PersonAttribute`;
  }
  
}
