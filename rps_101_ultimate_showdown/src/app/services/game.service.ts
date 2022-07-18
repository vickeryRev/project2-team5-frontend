import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { GameImages } from '../Models/game-images';

@Injectable({
  providedIn: 'root'
})
export class GameService {


  constructor(private http: HttpClient) { }

  

  getMatch(objectOne : string, ObjectTwo : string) : Observable<any>{

    console.log("get match activated")
     return this.http.get<any>(`https://rps101.pythonanywhere.com/api/v1/match?object_one=${objectOne}&object_two=${ObjectTwo}`)
     .pipe(catchError(this.handleError));
  }


  private handleError(httpError: HttpErrorResponse){
    if (httpError.error instanceof ErrorEvent){

      console.log('an error occured: ', httpError.error.message);


    }else{
      console.error(`
      
        Backend returned code ${httpError.status}
        body was ${httpError.error}
      
      `)
    }

    return throwError(() => new Error('something really bad happened'))
  }
}
