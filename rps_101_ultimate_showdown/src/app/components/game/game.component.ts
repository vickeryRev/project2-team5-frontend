import { GameService } from './../../services/game.service';
import { Component, OnInit } from '@angular/core';
import { ClientMessage } from 'src/app/Models/client-message';
import { GameObject } from 'src/app/Models/game-object';
import { GAMEOBJECTS } from 'src/app/Models/list-of-game-obj';
import { GameImages } from 'src/app/Models/game-images';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

  object1 = -1;
  object2 = "";
  clientMessage: ClientMessage = new ClientMessage('');
  gameImage: GameImages = new GameImages('','','','','');
  vsImage = "assets/vs.bmp";

  title = "It's the Game!"
  
  constructor(private gameService : GameService) { }

 randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  playMatch(){

    const compObject = GAMEOBJECTS[this.randomIntFromInterval(0,100)];
    const playerObject = GAMEOBJECTS[this.object1];
    console.log("Player object is " + playerObject.name);
    console.log("Computer Object is: " + compObject.name);



    this.gameImage.compObjectUrl = `${compObject.url}`;
    this.gameImage.playerUrl = `${playerObject.url}`;
    this.gameImage.computerName = `${compObject.name}`;
    this.gameImage.playerName =`${playerObject.name}`;
    

  this.gameService.getMatch(playerObject.name, compObject.name)
  .subscribe(
    data => {if(data.winner.toLowerCase()==playerObject.name){this.clientMessage.message = `YOU WIN! ${data.winner} ${data.outcome} ${data.loser}`}
              else if(data.winner.toLowerCase()==compObject.name){
                this.clientMessage.message = `YOU LOSE! ${data.winner} ${data.outcome} ${data.loser}`
              }else{
                this.clientMessage.message = `DRAW!`
              }}, 
    error => this.clientMessage.message = `Something went wrong.  Error ${error}`
  )
  }

}
