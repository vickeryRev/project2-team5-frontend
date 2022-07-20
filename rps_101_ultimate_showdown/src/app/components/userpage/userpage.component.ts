import { AppComponent } from './../../app.component';
import { Component, OnInit } from '@angular/core';
import { setupTestingRouter } from '@angular/router/testing';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {

  constructor(AppComponent:AppComponent) { }

  ngOnInit(): void {
  }

  signOut(): void {
    window.location.reload();
  }
}

