import { ClientMessage } from './../../Models/client-message';
import { UserService } from './../../services/user.service';
import { User, throwUsage} from './../../Models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  title = "register user";
  user: User = new User(0,'','','','','',[]);
 // pk: pk = new pk(0,"");
  throwThings: throwUsage = new throwUsage(0,0,0,'',0);
  clientMessage: ClientMessage = new ClientMessage("");
  constructor(private UserService: UserService) { }

  registerUser(): void{
    //this.user.throwThings.push(this.throwThings);
    this.UserService.registerUser(this.user)
    .subscribe(
      data => this.clientMessage.message = `Registration successful for ${data.firstName}`,
      error => this.clientMessage.message = `well, something went wroung here some data ${error}`
    )
  }

  ngOnInit(): void {
  }

}
