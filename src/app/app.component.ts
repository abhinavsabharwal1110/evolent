import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MaintainUserDataService } from './maintain-user-data.service'
import { FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  reactiveForm : FormGroup;
  userStatus = ["Active", "In Active"];
  userData = [];
  editFlag = false;
  index = null;
  currentUserId = null;
  constructor(private popUp: ToastrService,private userService : MaintainUserDataService){}

  ngOnInit(){
    this.reactiveForm = new FormGroup({
      'firstName' : new FormControl(null,Validators.required),
      'lastName' : new FormControl(null,Validators.required),
      'email' : new FormControl(null,
        [
          Validators.required,
          Validators.email
        ]),
      'phoneNum' : new FormControl(null,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ]),
      'status' : new FormControl('Active')
    });
    this.userData = this.userService.getUsers();
  }

  onSubmit(){
    let uniqueUserFlag = this.isUniqueUser();
    if(uniqueUserFlag){
      if(this.editFlag) 
        this.userService.updateUser(this.reactiveForm.value,this.index);
      else
        this.userService.addUser(this.reactiveForm.value);
      this.successPopUp();
      this.clearForm();
    }else
      this.errorPopUp();
  }
  isUniqueUser(){
    let userEmail;
    if(!this.editFlag){
      userEmail = this.userData.map(elm=>elm.email.toLowerCase());
      return userEmail.indexOf(this.reactiveForm.value.email.toLowerCase()) == -1;
    }else{
      userEmail = this.userData.map(elm=>{
        return elm.email != this.currentUserId ? elm.email.toLowerCase() : "";
      })
      return userEmail.indexOf(this.reactiveForm.value.email.toLowerCase()) == -1;
    }
  }
  successPopUp(){
    let msg = this.editFlag ? "User details updated successfully" : "User details added successfully";
    this.popUp.success(msg,'Success!',{
      timeOut : 5000
    });
  }
  errorPopUp(){
    this.popUp.error('User with given email already exists','Error!', {
      timeOut : 5000
    });
  }
  editUser(index:number){
    this.index = index;
    this.editFlag = true;
    let currentUser = this.userService.getUser(index);
    this.currentUserId = currentUser.email;
    this.reactiveForm.setValue(currentUser);
  }
  isNum(event:any) {
    let elemVal = event.target.value.length,
      charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    else if(elemVal>=10)
      return false;
    return true;
  }
  clearForm(){
    this.reactiveForm.reset();
    this.reactiveForm.patchValue({
      'status' : 'Active'
    })
    this.editFlag = false;
    this.index = null;
    this.currentUserId = null;
  }
}
