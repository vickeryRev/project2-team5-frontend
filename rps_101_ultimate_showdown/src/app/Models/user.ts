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
  pk : pk;
  uses: number;
  wins: number;

  constructor(pk: pk, uses: number, wins: number) {
    this.pk = pk
    this.uses = uses
    this.wins = wins
  }
 
  

}

export class pk{
  id: number;
  name: string;


  constructor(id: number, name: string) {
    this.id = id
    this.name = name
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