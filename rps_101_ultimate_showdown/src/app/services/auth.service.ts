import { Observable } from 'rxjs';
import { url } from './../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
    headers : new HttpHeaders({"Content-Type" : "application/json"})
  }
  loginUrl = url + `/login`
  constructor(private http: HttpClient) { }

  login(username: string, password :string): Observable<any>{
    //set up body of response
    const payload = {username, password}

    return this.http.post<any>(this.loginUrl, payload, this.httpOptions)
  }
}
