import { HttpClient, HttpErrorResponse, HttpHandler, HttpHandlerFn, HttpHeaders, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { Refreshapi } from '../models/refreshapi';
import { Authresponse } from '../models/authresponse';
import { inject } from '@angular/core';
import { LocalAuthService } from '../services/local-auth-service';
import { Router } from '@angular/router';

let isRefreshing : boolean = false;
let tokenSubject = new BehaviorSubject<string | null>(null);

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const localAuthService = inject(LocalAuthService);
  const router = inject(Router);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !isRefreshing) {
        return handle401Error(req, next, localAuthService, router);
        // Handle 401 Unauthorized errors (e.g., token expiration)
        // You can implement token refresh logic here
        // For example, call a refresh token API and retry the original request
      }
      return throwError(() => error);
    })
  );
};

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

 function handle401Error(request: HttpRequest<any>, next: HttpHandlerFn, localAuthService: LocalAuthService, router: Router) {
  console.log("Handling 401 error - refreshing token");
  
  if (!isRefreshing) {
    console.log("We will refresh token...");
    isRefreshing = true;
    tokenSubject.next(null);

    //Try to refresh the token
    return localAuthService.refreshToken().pipe(
      catchError((err) => {
        // If refresh token also fails, logout the user or redirect to login
        console.log("Refresh token failed");
        isRefreshing = false;
        router.navigate(['/login']);
        return throwError(() => err);
      })
    ).pipe(
      switchMap((authresponse: Authresponse) => {

        // Retry the original request with the new access token

        console.log("Token refreshed , Retry original request");
        isRefreshing = false;
        localAuthService.afterLogin(authresponse.userid, authresponse.login, authresponse.firstname, authresponse.lastname, authresponse.accesstoken, 
            authresponse.refreshtoken, authresponse.personid, authresponse.roles);
        tokenSubject.next(authresponse.accesstoken);

        const clonedRequest = request.clone({
          headers: request.headers.set('Authorization', 'Bearer ' + authresponse.accesstoken)
        });
        return next(clonedRequest);
      })
    );

  }
  else {
    console.log("Already refreshing token, waiting...");
    return tokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap((token) => {
          return next(addTokenHeader(request, token));
        })
      );
  }

}

function errorHandler(error: any) {
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

  function addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
