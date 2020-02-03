import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { MaintainUserDataService } from '../maintain-user-data.service'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Input() usersList;
  @Output() editUserData = new EventEmitter<number>();
  @Input() selectedIndex:number = null;

  constructor(private userService : MaintainUserDataService) { }

  ngOnInit() {
    
  }

  deleteUser(index:number){
    this.userService.deleteUser(index);
  }
  editUser(index:number){
    this.editUserData.emit(index);
    this.selectedIndex = index;
  }
}
