import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rps_101_ultimate_showdown';
  public isLoggedIn: boolean = false;
  public username: string ="tim";

  updateUserData(username: string): void {
    this.username = username;
  }

  getUsername(): string{
    return this.username;
  }

  //logout 
  signOut(): void {
    window.location.reload();
  }
}
