import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {
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

  apiUrl = 'http://localhost:3000/customers';


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
  deleteData(id:any): Observable<any>
  {
    console.log('DeleteAPI==>',id)
    return this._http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  updateCustomer(data:any,id:any): Observable<any>
  {
    let ids = id;
    console.log(ids)
    console.log(data)
    return this._http.put(`${this.apiUrl}/${id}`,data).pipe(
      catchError(this.handleError)
    );
  }
  getSingleCustomer(id:any): Observable<any>
  {
    let ids = id;
    return this._http.get(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
}
