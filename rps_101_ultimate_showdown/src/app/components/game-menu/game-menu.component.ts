import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-game-menu',
  templateUrl: './game-menu.component.html',
  styleUrls: ['./game-menu.component.css']
})
export class GameMenuComponent implements OnInit {

  constructor(private AppComponent: AppComponent) { }

  ngOnInit(): void {
  }

  flipIsLanded(){
    this.AppComponent.isLanded = false;
  }
}
