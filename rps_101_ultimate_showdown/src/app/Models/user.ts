export class User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    //more to add here

  constructor(
    id: number, 
    firstName: string, 
    lastName: string, 
    username: string, 
    password: string, 
    email: string
) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.username = username
    this.password = password
    this.email = email
  }

}