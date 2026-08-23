import { inject, Injectable,Service,  ResourceRef, Signal } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, httpResource, HttpResourceRef } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { rxResource } from '@angular/core/rxjs-interop';

export interface DataOperations<T, ID> {
  insert(t: T): Observable<T>;
  update(id: ID, t: T): Observable<T>;
  getOne(id: ID): Observable<T>;
  getAll(): Observable<T[]>;
  delete(id: ID): Observable<T>;
}

@Service()
export abstract class DataService<T, ID> implements DataOperations<T, ID> {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  public abstract getResourceUrl(): string;



_http: HttpClient = inject(HttpClient);

  insert(t: T): Observable<T> {
    return this._http.post<T>(this.getResourceUrl(), t).pipe(
      catchError(this.errorHandler)
    );
  }

  update(id: ID, t: T): Observable<T> {
    return this._http.put<T>(this.getResourceUrl() + "/" + id, t).pipe(
      catchError(this.errorHandler)
    );
  }

  getOne(id: ID): Observable<T> {
    return this._http.get<T>(this.getResourceUrl() + "/" + id).pipe(
      //retry(2),
      catchError(this.errorHandler)
    );
  }

  getAll(): Observable<T[]> {
    return this._http.get<T[]>(this.getResourceUrl()).pipe(
      //retry(2),
      catchError(this.errorHandler)
    );
  }

  delete(id: ID): Observable<T> {
    return this._http.delete<T>(this.getResourceUrl() + "/" + id).pipe(
      catchError(this.errorHandler)
    );
  }

 
  getOneRx(id: ID): HttpResourceRef<T | undefined> {
    console.log('Called getOneRx' + id);
    return httpResource<T | undefined>(() => ({
      url: this.getResourceUrl() + "/" + id,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
    }));
  }
  

  getOneRxParse(id: Signal<ID>): HttpResourceRef<T | undefined> {
    console.log(id());
    return httpResource<T | undefined>(() => ({
      url: this.getResourceUrl() + '${id()}',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }   
    }));
  }

   getAllRx(): HttpResourceRef<T[] | undefined> {
    return httpResource<T[] | undefined>(() => ({
      url: this.getResourceUrl(),
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
    }));
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
    return throwError(errorMessage);
  }

}
