import { inject, Injectable, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { DataService } from './data-service';
import { environment } from '../../environments/environment';
import { Attribute } from '../models/attribute';

@Service()
export class AttributeService extends DataService<Attribute, number>  {

  public override _http: HttpClient = inject(HttpClient);
  // constructor(protected override _http: HttpClient) {
  //   super(_http);
  // }

  getResourceUrl(): string {
    return `${environment.baseUrl}/api/attribute`;
  }

  // Additional methods specific to AttributeService can be added here  
  
}
