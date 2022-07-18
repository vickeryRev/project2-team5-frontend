import { User } from './../Models/user';
import { url } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl: string = url+ `/users`;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  }
  constructor(private http: HttpClient) { }

  //http requests
  registerUser(user:User): Observable<User>{
    return this.http.post<User>(`${this.userUrl}/add`,user, this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  findUserByUserName(userName: string): Observable<User>{
    //:5000/find.${userName}
    return this.http.get<User>(`${this.userUrl}/find/${userName}`, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }
  //custom methods

  private handleError(httpError: HttpErrorResponse){
    if(httpError.error instanceof ErrorEvent){
      console.log("An error has occured: ", httpError.error.message);
    }
    else{
      console.error(
        `backend returned code ${httpError.status}
        body was ${httpError.error}`
      )
    }
    return throwError(() => new Error(`Well that did not work out did it?`));
  }
}
