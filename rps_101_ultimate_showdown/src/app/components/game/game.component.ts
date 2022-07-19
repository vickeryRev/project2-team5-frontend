import { AppComponent } from 'src/app/app.component';
import { User, throwUsage} from './../../Models/user';
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
export class GameComponent implements OnInit{
  
  user: User = new User(0,"","","","","", []);
  object1 = -1;
  object2 = "";
  clientMessage: ClientMessage = new ClientMessage('');
  gameImage: GameImages = new GameImages('','','','','');
  vsImage = "assets/vs.bmp";
  winFlag: string = "";
  title = "It's the Game!"

  playMatchButtonActive:String = "disabled";
  
  constructor(private gameService : GameService,private UserService: UserService, 
    private AppComponent: AppComponent) {
      this.findUser();
   }

  ngOnInit(): void {
    console.log("This is the ngOnInit let's hope it works");
    this.findUser();
    
    
  }

   findUser(){
    
    this.UserService.findUserByUserName(this.AppComponent.getUsername()).subscribe({
      next:data => {
        //console.log(1);
        this.user = data;
        //this.clientMessage.message="";
        //console.log(this.user);
      },
      error: () =>  this.clientMessage.message= `User not logged in`
    }).add(()=>this.playMatchButtonActive = "activated");
  }

 randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  playMatch(){
    

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
  //console.log(this.user.throwUsage);
  //console.log(this.user.id);
 // console.log(playerObject.name.toUpperCase());
  let itemExist = this.indexOf2dArray(this.user.throwUsage , playerObject.name.toUpperCase());
 // console.log("Win flag: " + this.winFlag);
  //console.log("itemExist:" + itemExist);
  console.log(this.winFlag);
  if(itemExist === -1){
    let newObj : throwUsage;
  if(this.winFlag === "user"){
    newObj = new throwUsage(1,1,playerObject.name.toUpperCase(), this.user.id)
    this.user.throwUsage.push(newObj);
    }
    else{
      newObj = new throwUsage( 1, 0, playerObject.name.toUpperCase(),this.user.id);
      this.user.throwUsage.push(newObj);
  }
  this.UserService.updateUser(this.user).subscribe({
    next:()=>{}
  }).add(()=>this.playMatchButtonActive = "activated");
  }else{
    this.user.throwUsage[itemExist].uses ++;
    //console.log(this.user.throwUsage[itemExist].uses)
    
    
    if(this.winFlag === "user"){
      //console.log(this.user.throwUsage[itemExist].wins)
      this.user.throwUsage[itemExist].wins++;
      //console.log(this.user.throwUsage[itemExist].wins)
    }
    //console.log(this.user);
    this.playMatchButtonActive = "disabled";
    this.UserService.updateUser(this.user).subscribe({
      next:()=>{}
    }).add(()=>this.playMatchButtonActive = "activated");
  } 

  this.findUser();
  
//console.log(this.user)

}



indexOf2dArray(array2d: throwUsage[], itemtofind: string) {
    
  for(let i: number = 0; i < array2d.length; i++){
    if((array2d[i].throwEnum === itemtofind.toUpperCase())&&(array2d[i].user == this.user.id)){

      return i;
      
    }
  }
  return -1;


}
}