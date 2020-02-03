import { Injectable } from '@angular/core';
import { user } from './userInterface';

@Injectable({
  providedIn: 'root'
})

export class MaintainUserDataService {
  usersDataArr = [
    {
      "firstName": "Rohit",
      "lastName": "Sharma",
      "email": "rSharma@gmail.com",
      "phoneNum": "8589576923",
      "status": "Active"
    },
    {
      "firstName": "Virat",
      "lastName": "Kohli",
      "email": "vKohli@gmail.com",
      "phoneNum": "8589576369",
      "status": "In Active"
    },
    {
      "firstName": "MS",
      "lastName": "Dhoni",
      "email": "msDhoni@gmail.com",
      "phoneNum": "8589576380",
      "status": "Active"
    }
  ];
  constructor() { }

  addUser(data:user){
    this.usersDataArr.push(data);
  }
  
  updateUser(data:user,index:number){
    this.usersDataArr[index] = data;
  }

  deleteUser(index:number){
    this.usersDataArr.splice(index,1);
  }
  
  getUsers(){
    return this.usersDataArr;
  }
  getUser(index:number){
    return this.usersDataArr[index];
  }
}
