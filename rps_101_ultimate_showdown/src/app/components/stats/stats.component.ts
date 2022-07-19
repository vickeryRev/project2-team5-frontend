import { GAMEOBJECTS } from './../../Models/list-of-game-obj';

import { ClientMessage } from './../../Models/client-message';
import { AppComponent } from './../../app.component';
import { UserService } from './../../services/user.service';
import { User, throwUsage, expandedThrow } from './../../Models/user';
import { Component, Input, OnInit } from '@angular/core';
import { GameObject } from 'src/app/Models/game-object';
import { raceInit } from 'rxjs/internal/observable/race';


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
  data: expandedThrow[] = [];
  
  //throwThings1 = new throwThings(2,50,20,'paper');
  //throwThings2 = new throwThings(3,100,80,'scissors');
  ClientMessage: ClientMessage = new ClientMessage("");

 
  constructor(private UserService: UserService, private AppComponent: AppComponent) { 
    //this.user.throwUsage.push(new throwUsage(1,10,8,"air",1))
    
    //this.user.throwThings.push(new throwThings(2,50,20,'paper'));
    //this.user.throwThings.push(new throwThings(3,100,20,'scissors'));
    //this.fillOutData();
    this.setusername();
    this.sortThrowThings();
    this.calcOveralls();
    this.winRatio = this.calcWinRatio(this.gamesPlayed, this.gamesWon);  
    this.fillOutData();
    console.log(this.username)
  }

  ngOnInit(): void {
  }

  sortThrowThings(){
    if(this.user.throwUsage.length != 0){
      this.user.throwUsage.sort((a,b) => ((a.wins / a.uses) > (b.wins/b.uses)) ? 1 : -1);
      this.user.throwUsage.reverse();
    }
    else{
      return;
    }
  }
  calcOveralls(){
    for( let i :number = 0; i < this.user.throwUsage.length; i ++){
      this.gamesPlayed += this.user.throwUsage[i].uses;
      this.gamesWon += this.user.throwUsage[i].wins;
      
    }
  }
  

  calcWinRatio(played : number, won: number){
    if(played === 0){
      return NaN;
    }
    return (Math.round((won / played)* 100)/100)*100; 
    
  }

  fillOutData(){
    for( let i :number = 0; i < this.user.throwUsage.length; i ++){
     
      let ratio = this.calcWinRatio(this.user.throwUsage[i].uses , this.user.throwUsage[i].wins)
      let index: number =  this.indexOf2dArray(GAMEOBJECTS, this.user.throwUsage[i].throwEnum.toLowerCase());
      let temp = new expandedThrow(this.user.throwUsage[i].throwEnum , this.user.throwUsage[i].uses , this.user.throwUsage[i].wins, ratio, GAMEOBJECTS[index].url )
      this.data.push(temp);
    }
  }

  indexOf2dArray(array2d: GameObject[], itemtofind: any) {
    
    for(let i: number = 0; i < array2d.length; i++){
      if(array2d[i].name === itemtofind){
        return i;
      }
    }
    return -1;
  
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