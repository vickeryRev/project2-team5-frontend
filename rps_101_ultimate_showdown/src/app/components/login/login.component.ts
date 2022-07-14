import { AppComponent } from './../../app.component';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = "";
  password: string = "";
  loginErrorMsg: string = "";
  isLoading: boolean = false;

  constructor(private AuthService: AuthService, private AppComponent: AppComponent) { }

  //pass username and password for template, and call auth service on the back end
  
  login(){
    //check if login values are empty

    if(!this.username.trim() || !this.password.trim()){
      this.loginErrorMsg = "Login for user failed, must fill out username and password feilds"
      return;
    }

    //call auther service, hit /login endpoint on back end

    this.isLoading = true;
    this.AuthService.login(this.username, this.password)
    .subscribe(
      (response) => {
        this.isLoading = false;

        //build token
        const token = response.headers.get('rps-ultimate-showdown-token')
        //save token to session on browser
        sessionStorage.setItem("token", token)

        this.AppComponent.isLoggedIn = true;
        this.AppComponent.updateUserData(response.body.username)
      },
      //failed login
      () => {
        this.isLoading = false;
        this.loginErrorMsg = ""
      }
    );
    this.username ="";
    this.loginErrorMsg="";
  }
  

}
