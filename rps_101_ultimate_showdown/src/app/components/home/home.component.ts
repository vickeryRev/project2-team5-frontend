import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isNewUser: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  changeDisplay(){
    this.isNewUser = !this.isNewUser;
  }
}
