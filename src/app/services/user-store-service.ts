import { Injectable } from '@angular/core';
import { StoreService } from './store-service';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService extends StoreService<IUserStore> {

  constructor() {
    // The default values of the store
    super();
  }
}

export interface IUserStore {
  userid?: number;
  login?: string;
  firstname?: string;
  lastname?: string;
  isLoggedIn?:boolean;
  personid?:number;
  accessToken?:string;
  roles: string[];
}
