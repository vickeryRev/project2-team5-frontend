export class User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  throwUsage: throwUsage[];
  //more to add here


constructor(
  id: number, 
  firstName: string, 
  lastName: string, 
  username: string, 
  password: string, 
  email: string, 
  throwUsage: throwUsage[]
) {
  this.id = id
  this.firstName = firstName
  this.lastName = lastName
  this.username = username
  this.password = password
  this.email = email
  this.throwUsage = throwUsage
}


}

export class throwUsage{
id: number;
uses: number;
wins: number;
throwEnum: string;
user: number;



  constructor(
    id: number, 
    uses: number, 
    wins: number, 
    throwEnum: string, 
    user: number
) {
    this.id = id
    this.uses = uses
    this.wins = wins
    this.throwEnum = throwEnum
    this.user = user
  }
  



}


export class expandedThrow{
name: string;
uses: number;
wins: number;
ratio: number;
pic: string;


constructor(
  name: string, 
  uses: number, 
  wins: number, 
  ratio: number, 
  pic: string
) {
  this.name = name;
  this.uses = uses
  this.wins = wins
  this.ratio = ratio
  this.pic = pic
}

}