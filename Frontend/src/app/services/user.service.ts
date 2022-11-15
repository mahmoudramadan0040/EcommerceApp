import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import IUser from "../interfaces/user.interface";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) { }

  private apiUrl:string = environment.apiUrl+'/user';
  // get all the users
  getUsers():Observable<IUser[]>{
    return this.http.get<IUser[]>(this.apiUrl)
    .pipe(
      tap(users => console.log((users))),
      catchError(this.errorHandler)
    )
  }
  // get one user
  getUser(id : string):Observable<IUser>{
    return this.http.get<IUser>(this.apiUrl +'/'+ id)
    .pipe(
      tap(user => console.log(user)),
      catchError(this.errorHandler)
    )
  }
  // remove one user
  removeUser(id:string):Observable<any>{
    console.log(id)
    console.log()
    return this.http.delete(`${this.apiUrl}/${id}`)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  // update user information
  updateUser(id:string,user:any):Observable<string>{
    console.log(`${this.apiUrl}/${id}`,JSON.stringify(user))
    return this.http.put<string>(`${this.apiUrl}/${id}`,JSON.stringify(user),httpOptions)
    .pipe(
      tap(msg => console.log(msg)),
      catchError(this.errorHandler)
    )
  }


  errorHandler(error:any) {
    console.log(error)
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
      console.log(errorMessage)
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }
}
