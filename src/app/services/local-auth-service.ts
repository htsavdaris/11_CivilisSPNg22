import { inject, Injectable, signal, Service } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { User } from '@models/user';
import { UserStoreService, IUserStore } from './user-store-service';
import { BehaviorSubject, firstValueFrom, Observable, of, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserService } from './user-service';
import { Userauth } from '@models/userauth';
import { catchError, tap } from 'rxjs/operators';
import { Authresponse } from '@models/authresponse';
import { Router } from '@angular/router';
import { Refreshapi } from '../models/refreshapi';
import { LOCAL_STORAGE } from '@core/config/tokens';

@Injectable({
  providedIn: 'root'
})
export class LocalAuthService {



  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };



  private http = inject(HttpClient);
  public userStoreService = inject(UserStoreService);
  public router = inject(Router);
  private userService = inject(UserService);
  private readonly _localStorage = inject(LOCAL_STORAGE);
  private readonly _currentUser = signal<User | null>(null);
  public readonly currentUser = this._currentUser.asReadonly();

  //public user: User | null = null;

  // public isAuthenticated = signal<boolean>(false);
  // public loginName$: BehaviorSubject<string> = new BehaviorSubject<string>("");
  // public role$: BehaviorSubject<string> = new BehaviorSubject<string>("");

  public setUser(user: User): void {
      this._currentUser.set(user);
  }

  public beforeLogin() {
    if (localStorage.getItem('refreshToken')) {
      this.userStoreService.setState({ isLoggedIn: true } as IUserStore);
    }
  }


  public afterLogin(userid: number, login: string, firstname: string, lastname: string, accessToken: string, refreshToken: string, personid: number, roles: string[] = []) {          
    localStorage.setItem('refreshToken', refreshToken);
    this.userStoreService.setState({ isLoggedIn: true } as IUserStore);
    this.userStoreService.setState({ userid: userid } as IUserStore);
    this.userStoreService.setState({ login: login } as IUserStore);
    this.userStoreService.setState({ firstname: firstname } as IUserStore);
    this.userStoreService.setState({ lastname: lastname } as IUserStore);
    this.userStoreService.setState({ accessToken: accessToken } as IUserStore);
    this.userStoreService.setState({ personid: personid } as IUserStore);
    this.userStoreService.setState({ roles: roles } as IUserStore);
  }


  public authenticate(userAuth: Userauth): Observable<Authresponse> {
    return this.http.post<Authresponse>(this.getResourceUrl() + "/authenticate", userAuth).pipe(      
      catchError(this.errorHandler)
    );
  }

  public logout() {
    
    this._currentUser
    localStorage.removeItem('refreshToken');
    this.userStoreService.setState({ isLoggedIn: false } as IUserStore);
    this.userStoreService.setState({ userid: 0 } as IUserStore);
    this.userStoreService.setState({ login: "" } as IUserStore);
    this.userStoreService.setState({ firstname: "" } as IUserStore);
    this.userStoreService.setState({ lastname: "" } as IUserStore);
    this.userStoreService.setState({ accessToken: "" } as IUserStore);
    this.userStoreService.setState({ personid: 0 } as IUserStore);
    this.router.navigate(['/login']);
    
  }

  public reEnterApp(): Observable<Authresponse> {    
    var prefreshToken = localStorage.getItem('refreshToken');
    var refreshapi = new Refreshapi();
    refreshapi.accesstoken = "";
    refreshapi.refreshtoken = prefreshToken ? prefreshToken : "";
    
    return this.http.post<Authresponse>(this.getResourceUrl() + "/reenter",  refreshapi  , this.httpOptions).pipe(    
      catchError(this.errorHandler)
    );
  }

  public refreshToken(): Observable<Authresponse> {    
    var prefreshToken = localStorage.getItem('refreshToken');
    var refreshapi = new Refreshapi();
    refreshapi.accesstoken = "";
    refreshapi.refreshtoken = prefreshToken ? prefreshToken : "";
    return this.http.post<Authresponse>(this.getResourceUrl() + "/reenter",  refreshapi  , this.httpOptions).pipe(    
      catchError(this.errorHandler), 
      tap(response => {
        this.afterLogin(response.userid, response.login, response.firstname, response.lastname, response.accesstoken, response.refreshtoken, response.personid, response.roles);
      })
    );
  }


  private getResourceUrl(): string {
    return `${environment.baseUrl}/api/user`;
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
