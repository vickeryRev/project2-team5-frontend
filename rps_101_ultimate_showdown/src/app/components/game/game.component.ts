import { AppComponent } from 'src/app/app.component';
import { User, throwUsage, pk } from './../../Models/user';
import { GameService } from './../../services/game.service';
import { Component, OnInit } from '@angular/core';
import { ClientMessage } from 'src/app/Models/client-message';
import { GameObject } from 'src/app/Models/game-object';
import { GAMEOBJECTS } from 'src/app/Models/list-of-game-obj';
import { GameImages } from 'src/app/Models/game-images';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

  user: User = new User(0,"","","","","", []);
  object1 = -1;
  object2 = "";
  clientMessage: ClientMessage = new ClientMessage('');
  gameImage: GameImages = new GameImages('','','','','');
  vsImage = "assets/vs.bmp";
  winFlag: string = "";
  title = "It's the Game!"
  
  constructor(private gameService : GameService,private UserService: UserService, 
    private AppComponent: AppComponent) {

   }

   findUser(){
    this.UserService.findUserByUserName(this.AppComponent.getUsername())
    .subscribe(
      data => {
        //console.log(data);
        this.user = data;
        this.clientMessage.message="";
        //console.log(this.user.username + '1');
      },
      ()=> this.clientMessage.message= `User not logged in`

    )
  }

 randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  playMatch(){
    this.findUser();
    const compObject = GAMEOBJECTS[this.randomIntFromInterval(0,100)];
    const playerObject = GAMEOBJECTS[this.object1];
    //console.log("Player object is " + playerObject.name);
   // console.log("Computer Object is: " + compObject.name);
    


    //console.log(this.user.username + '2');
    //console.log(this.user.throwUsage[0]);
   

    this.gameImage.compObjectUrl = `${compObject.url}`;
    this.gameImage.playerUrl = `${playerObject.url}`;
    this.gameImage.computerName = `${compObject.name}`;
    this.gameImage.playerName =`${playerObject.name}`;
    

  this.gameService.getMatch(playerObject.name, compObject.name)
  .subscribe(
    data => {if(data.winner.toLowerCase()==playerObject.name){
              this.clientMessage.message = `YOU WIN! ${data.winner} ${data.outcome} ${data.loser}`
              this.winFlag = "user";
            } else if(data.winner.toLowerCase()==compObject.name){
                this.clientMessage.message = `YOU LOSE! ${data.winner} ${data.outcome} ${data.loser}`
                this.winFlag = "comp";
              }else{
                this.clientMessage.message = `DRAW!`
                this.winFlag = "noOne";
              }}, 
    error => this.clientMessage.message = `Something went wrong.  Error ${error}`
  )
  let itemExist = this.indexOf2dArray(this.user.throwUsage , playerObject.name);
  //console.log(itemExist);
  
  if(itemExist === -1){
    let newObj : throwUsage;
    let newPk = new pk(this.user.id, playerObject.name);
    if(this.winFlag === "user"){
    let newObj = new throwUsage(newPk,1,1);
    this.user.throwUsage.push(newObj);
    }
    else{
      newObj = new throwUsage(newPk, 1, 0);
      this.user.throwUsage.push(newObj);
    }
    
  }else{
    this.user.throwUsage[itemExist].uses ++;
    if(this.winFlag === "user"){
      this.user.throwUsage[itemExist].wins ++;
    }
  } 
  this.UserService.updateUser(this.user);
  

console.log(this.user)

}


indexOf2dArray(array2d: throwUsage[], itemtofind: any) {
    
  for(let i: number = 0; i < array2d.length; i++){
    if(array2d[i].pk.name === itemtofind){
      return i;
    }
  }
  return -1;


}
}