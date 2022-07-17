import { GAMEOBJECTS } from './../../Models/list-of-game-obj';

import { ClientMessage } from './../../Models/client-message';
import { AppComponent } from './../../app.component';
import { UserService } from './../../services/user.service';
import { User, throwThings } from './../../Models/user';
import { Component, Input, OnInit } from '@angular/core';
import { GameObject } from 'src/app/Models/game-object';


@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  username: string = "";
  gamesPlayed: number = 0;
  gamesWon: number = 0;
  winRatio: number = 0;
  user: User = new User(0,"","","","","", [])
  
  //throwThings = new throwThings(1,25,20,'rock');
  //throwThings1 = new throwThings(2,50,20,'paper');
  //throwThings2 = new throwThings(3,100,80,'scissors');
  ClientMessage: ClientMessage = new ClientMessage("");

  
  constructor(private UserService: UserService, private AppComponent: AppComponent) { 
    this.user.throwThings.push(new throwThings(1,25,20,'rock',0,""));
    this.user.throwThings.push(new throwThings(2,50,20,'paper',0,""));
    this.user.throwThings.push(new throwThings(3,100,20,'scissors',0,""));
    this.fillOutData();
    this.setusername();
    this.sortThrowThings();
    this.calcOveralls();
    this.winRatio = this.calcWinRatio(this.gamesPlayed, this.gamesWon);  
  }

  ngOnInit(): void {
  }

  sortThrowThings(){
    if(this.user.throwThings.length != 0){
      this.user.throwThings.sort((a,b) => ((a.wins / a.uses) > (b.wins/b.uses)) ? 1 : -1);
      this.user.throwThings.reverse();
    }
    else{
      return;
    }
  }
  calcOveralls(){
    for( let i :number = 0; i < this.user.throwThings.length; i ++){
      this.gamesPlayed += this.user.throwThings[i].uses;
      this.gamesWon += this.user.throwThings[i].wins;
    }
  }
  

  calcWinRatio(played : number, won: number){
    if(played === 0){
      return NaN;
    }
    return (Math.round((won / played)* 100)/100)*100; 
    
  }

  fillOutData(){
    for( let i :number = 0; i < this.user.throwThings.length; i ++){
      this.user.throwThings[i].ratio = this.calcWinRatio(this.user.throwThings[i].uses,this.user.throwThings[i].wins)
      let index: number =  this.indexOf2dArray(GAMEOBJECTS, this.user.throwThings[i].name);
      this.user.throwThings[i].image = GAMEOBJECTS[index].url;
    }
  }

  indexOf2dArray(array2d: GameObject[], itemtofind: any) {
    
    for(let i: number = 0; i < array2d.length; i++){
      if(array2d[i].name === itemtofind){
        return i;
      }
    }
    return -1;
  //return  array2d.indexOf(array2d.find(array2d => array2d.includes(itemtofind))) 
}

  setusername(){
    this.username = this.AppComponent.getUsername();
  }
  findUser(){
    this.UserService.findUserByUserName(this.username)
    .subscribe(
      data => {
        this.user = data;
        this.ClientMessage.message="";
      },
      ()=> this.ClientMessage.message= `User : ${this.username} can not be found at this time.`

    )
  }
}