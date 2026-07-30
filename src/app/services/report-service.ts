import { Injectable, Inject, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { DataService } from './data-service';

import { Report } from '../models/report';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ReportService extends DataService<Report, number> {

  override _http: HttpClient = inject(HttpClient);

  getResourceUrl(): string {
    return `${environment.baseUrl}/api/report`;
  }

  createPersonReport(): Observable<string> {

    return this._http.get<string>(this.getResourceUrl() + "/personReport").pipe(
      map((data :any) => {
        return "OK";
      }),
      catchError(this.errorHandler)
    );
  }

  getPersonReports(): Observable<Report[]> {
    
    return this._http.get<Report[]>(this.getResourceUrl() + "/personReport").pipe(
      //retry(1),
      catchError(this.errorHandler)
    );
  }

  downloadFileWithId(id:number, path:string) {
    var headers = new Headers();
    headers.append('responseType', 'arraybuffer');
    var filename = path.replace(/^.*(\\|\/|\:)/, '');
    console.log(filename);
    let url = new URL(this.getResourceUrl() + "/personReportDownload/"+ id);

    return this._http.get(url.href, {
      withCredentials: true,
      responseType: 'blob'
    }).subscribe({
      next: (response: Blob) => {
        saveAs(response, filename)

      },
      error: error => { }
    });
  }

  
}
