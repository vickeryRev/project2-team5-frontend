import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'src/environments/environment';

/**
 * need to make an http ruequest ot the auth controller of the api
 * http://localhost:5000:/api/login ({username: "name" , password : "pass"})
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //sent as the header of the post request
  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  }
  loginUrl = url + '/login'
  constructor(private http: HttpClient) { }

  login(username: string, password :string): Observable<any>{
    //this is the body of the response
    const payload = {username, password} // claims

    //return the this.http.post method

    return this.http.post<any>(this.loginUrl, payload, {observe: 'response'})
    //if this dont work repalcye this.httpptions with { observe: 'response'}
    //could add . pipe() to reutrn any errors, create a custom error method
  }
}
