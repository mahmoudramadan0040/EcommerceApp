import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, throwError, catchError } from 'rxjs';
import {environment} from '../../environments/environment';
import IUser from '../interfaces/user.interface';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl:string = environment.apiUrl+'/user';
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    console.log(email,password)
    return this.http.post(this.apiUrl+ '/login', {
      email: email ,
      password: password
    }, httpOptions).pipe(
      tap(data => console.log(data)),
      catchError(this.errorHandler)
    )
  }

  register(user:IUser): Observable<any> {
    return this.http.post(this.apiUrl+ '/register', {
      username: user.username,
      firstname:user.firstname,
      lastname:user.lastname,
      email: user.email,
      password: user.password,
      role:'USER'
    }, httpOptions).pipe(
      tap(data => console.log(data)),
      catchError(this.errorHandler)

    )
  }
  errorHandler(error:any) {
    console.log(error)
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.message;
      console.log(errorMessage)
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
      console.log(errorMessage);
    }
    console.log(errorMessage);
    return throwError(error.error.message);
 }
}
