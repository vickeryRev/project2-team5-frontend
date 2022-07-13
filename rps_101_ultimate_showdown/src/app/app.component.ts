import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rps_101_ultimate_showdown';
  public isLoggedIn: boolean = false;
  username: string ="";

  updateUserData(username: string): void {
    this.username = username;
  }

  //logout 
  signOut(): void {
    window.location.reload();
  }
}
