import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeApiService {
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error(error.error.message));
  }
  constructor(private _http: HttpClient) { }

  // connect frontend to backend

  apiUrl = 'http://localhost:3000/employees';

  
  getAllData(): Observable<any>
  {
    return this._http.get(`${this.apiUrl}`).pipe(
      catchError(this.handleError)
    );
  }
  createData(data:any): Observable<any>
  {
    console.log(data,'createAPI=>')
    return this._http.post(`${this.apiUrl}`,data).pipe(
      catchError(this.handleError)
    );
  }
  deleteData(employee_id:any): Observable<any>
  {
    console.log('DeleteAPI==>',employee_id)
    return this._http.delete(`${this.apiUrl}/${employee_id}`).pipe(
      catchError(this.handleError)
    );
  }
  updateCustomer(data:any,employee_id:any): Observable<any>
  {
    let ids = employee_id;
    console.log(ids)
    console.log(data)
    return this._http.put(`${this.apiUrl}/${employee_id}`,data).pipe(
      catchError(this.handleError)
    );
  }
  getSingleCustomer(employee_id:any): Observable<any>
  {
    let ids = employee_id;
    return this._http.get(`${this.apiUrl}/${employee_id}`).pipe(
      catchError(this.handleError)
    );
  }
}
