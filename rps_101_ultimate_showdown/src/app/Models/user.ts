export class User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    throwThings: throwThings[];
    //more to add here


  constructor(
    id: number, 
    firstName: string, 
    lastName: string, 
    username: string, 
    password: string, 
    email: string, 
    throwThings: throwThings[]
) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.username = username
    this.password = password
    this.email = email
    this.throwThings = throwThings
  }
  

}

export class throwThings{
  id: number;
  uses: number;
  wins: number;
  ratio: number;
  image: string;
  name: string;



  constructor(
    id: number, 
    uses: number, 
    wins: number, 
    name: string,
    ratio: number, 
    image: string 
    
) {
    this.id = id
    this.uses = uses
    this.wins = wins
    this.ratio = 0
    this.image = ""
    this.name = name
  }
  

}