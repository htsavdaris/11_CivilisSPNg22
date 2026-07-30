import { Injectable, Inject , Service, inject} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { DataService } from './data-service';
import { User } from '../models/user';
import { changePass } from '../models/changepass';
import { AdminPassChange } from '../models/adminpasschange';

@Injectable({
  providedIn: 'root'
})
export class UserService extends DataService<User, number> {

override _http: HttpClient = inject(HttpClient);

  getByLogin(fldlogin: string) {
      return this._http.get<User>(this.getResourceUrl()+ '/login/' + fldlogin).pipe(
      
        catchError(this.errorHandler)
      );
    }

    changePassword(changepass : changePass ): Observable<any> {
      return this._http.post<User>(this.getResourceUrl()+ '/changepassword' , changepass).pipe(
        catchError(this.errorHandler)
      );
    }

    changePasswordByAdmin(adminPassChange: AdminPassChange ): Observable<any> {
      return this._http.post<User>(this.getResourceUrl()+ '/changepasswordbyadmin' , adminPassChange).pipe(
        catchError(this.errorHandler)
      );
    }

  getResourceUrl(): string {
    return `${environment.baseUrl}/api/user`;
  }
}